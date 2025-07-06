/**
 * FHIR Schema Translation Algorithm
 * 
 * This module translates FHIR StructureDefinitions into a normalized schema format
 * suitable for validation and processing. The algorithm processes FHIR's hierarchical
 * element definitions and converts them into a structured schema with proper nesting,
 * slicing, and type information.
 * 
 * ## Algorithm Overview
 * 
 * The translation process uses a **stack-based path navigation algorithm** that:
 * 1. Processes elements sequentially from the FHIR differential
 * 2. Calculates path differences between consecutive elements
 * 3. Generates enter/exit actions to build the nested structure
 * 4. Applies actions to a value stack to construct the final schema
 * 
 * ## Key Concepts
 * 
 * ### Path Elements
 * Each FHIR element path (e.g., "Patient.name.given") is parsed into PathElement objects
 * that contain the element name and optional slicing information.
 * 
 * ### Actions
 * The algorithm generates four types of actions:
 * - `enter`: Navigate into a new element
 * - `exit`: Exit from current element and add it to parent
 * - `enter-slice`: Enter a slice within an element
 * - `exit-slice`: Exit a slice and add it to the slicing collection
 * 
 * ### Value Stack
 * A stack maintains the current nesting context. Each stack level represents
 * a nested element being built. Actions manipulate this stack to construct
 * the final nested structure.
 * 
 * ## Processing Flow
 * 
 * 1. **Path Parsing**: Convert FHIR paths into PathElement arrays
 * 2. **Path Enrichment**: Inherit slicing information from previous paths
 * 3. **Action Calculation**: Compare paths to determine navigation actions
 * 4. **Action Application**: Execute actions to build the schema structure
 * 5. **Element Building**: Transform FHIR elements into schema format
 * 
 * ## Special Handling
 * 
 * ### Choice Types (Union Elements)
 * Elements ending with `[x]` or having multiple types are expanded into
 * separate elements for each type (e.g., `valueString`, `valueQuantity`).
 * 
 * ### Slicing
 * FHIR slicing allows multiple constraints on the same element path.
 * The algorithm builds slice collections with discriminator matching criteria.
 * 
 * ### Extensions
 * Extension elements are processed specially to build extension metadata
 * and are separated from regular elements.
 * 
 * ## Example
 * 
 * Input FHIR elements:
 * ```
 * Patient.name -> enter: name
 * Patient.name.given -> enter: given, exit: given, exit: name
 * Patient.telecom -> enter: telecom, exit: telecom
 * ```
 * 
 * Result schema:
 * ```json
 * {
 *   "elements": {
 *     "name": {
 *       "elements": {
 *         "given": { ... }
 *       }
 *     },
 *     "telecom": { ... }
 *   }
 * }
 * ```
 * 
 * ## Performance
 * 
 * The algorithm is designed for high performance:
 * - Single-pass processing of elements
 * - O(n) complexity for n elements
 * - Minimal object creation and copying
 * - Efficient path comparison using common prefix calculation
 */

// Core type definitions
interface FHIRType {
  code: string;
  profile?: string[];
  targetProfile?: string | string[];
  extension?: Extension[];
}

interface Extension {
  url: string;
  valueString?: string;
  valueCanonical?: string;
  valueUrl?: string;
}

interface Binding {
  strength?: string;
  valueSet?: string;
  extension?: Extension[];
  description?: string;
}

interface Constraint {
  key: string;
  severity?: string;
  human?: string;
  expression?: string;
  xpath?: string;
}

interface Discriminator {
  type?: string;
  path: string;
}

interface Slicing {
  discriminator?: Discriminator[];
  ordered?: boolean;
  rules?: string;
  min?: number;
  max?: number;
}

interface ElementDefinition {
  id?: string;
  path: string;
  min?: number;
  max?: string;
  type?: FHIRType[];
  binding?: Binding;
  constraint?: Constraint[];
  slicing?: Slicing;
  sliceName?: string;
  contentReference?: string;
  extension?: Extension[];
  [key: string]: any; // For pattern* and fixed* properties
}

interface StructureDefinition {
  id?: string;
  url: string;
  name?: string;
  type?: string;
  version?: string;
  description?: string;
  package_name?: string;
  package_version?: string;
  package_id?: string;
  kind?: string;
  derivation?: string;
  baseDefinition?: string;
  abstract?: boolean;
  differential?: {
    element: ElementDefinition[];
  };
  snapshot?: {
    element: ElementDefinition[];
  };
}

interface PathElement {
  el: string;
  slicing?: Slicing;
  sliceName?: string;
  slice?: any;
}

interface Action {
  type: 'enter' | 'exit' | 'enter-slice' | 'exit-slice';
  el?: string;
  sliceName?: string;
  slicing?: Slicing;
  slice?: any;
}

// Utility functions
function requiredElement(element: ElementDefinition): boolean {
  return element.min === 1;
}

function coerceElementMaxCardinality(value: string): number {
  if (value === "*") {
    return Number.MAX_SAFE_INTEGER;
  }
  if (typeof value === "string") {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

function arrayElement(element: ElementDefinition): boolean {
  if (element.max === "*") return true;
  if (element.min && element.min >= 2) return true;
  if (element.max && coerceElementMaxCardinality(element.max) >= 2) return true;
  return false;
}

function parseIntSafe(x: string): number | null {
  try {
    const result = parseInt(x, 10);
    return isNaN(result) ? null : result;
  } catch {
    return null;
  }
}

function parsePath(element: ElementDefinition): PathElement[] {
  const elementPath = element.path;
  const pathSegments = elementPath.split('.').slice(1).map(segment => ({ el: segment }));
  const maxCardinality = element.max && element.max !== "*" ? parseIntSafe(element.max) : null;
  
  let pathElementData: Partial<PathElement> = {};
  
  if (element.slicing) {
    pathElementData.slicing = element.slicing;
  }
  
  if (element.sliceName) {
    pathElementData.sliceName = element.sliceName;
    pathElementData.slice = {
      ...(element.min !== undefined && { min: element.min }),
      ...(maxCardinality !== null && { max: maxCardinality })
    };
  }
  
  // Update the last element in path
  if (pathSegments.length > 0) {
    pathSegments[pathSegments.length - 1] = { ...pathSegments[pathSegments.length - 1], ...pathElementData };
  }
  
  return pathSegments;
}

// Calculate common path
function getCommonPath(previousPath: PathElement[], currentPath: PathElement[]): PathElement[] {
  const result: PathElement[] = [];
  const minLength = Math.min(previousPath.length, currentPath.length);
  
  for (let i = 0; i < minLength; i++) {
    if (previousPath[i].el !== currentPath[i].el) {
      break;
    }
    result.push(previousPath[i]);
  }
  
  return result;
}

// Copy slices from previous path
function enrichPath(previousPath: PathElement[], currentPath: PathElement[]): PathElement[] {
  const enrichedPath: PathElement[] = [];
  const minLength = Math.min(previousPath.length, currentPath.length);
  
  let i = 0;
  for (; i < minLength; i++) {
    if (previousPath[i].el !== currentPath[i].el) {
      break;
    }
    enrichedPath.push({
      ...(previousPath[i].slicing && { slicing: previousPath[i].slicing }),
      ...(previousPath[i].sliceName && { sliceName: previousPath[i].sliceName }),
      ...(previousPath[i].slice && { slice: previousPath[i].slice }),
      ...currentPath[i]
    });
  }
  
  // Add remaining elements from currentPath
  for (; i < currentPath.length; i++) {
    enrichedPath.push(currentPath[i]);
  }
  
  return enrichedPath;
}

function sliceChanged(previousElement: PathElement | undefined, newElement: PathElement | undefined): boolean {
  return !!(previousElement?.sliceName && newElement?.sliceName && previousElement.sliceName !== newElement.sliceName);
}

function createExitSliceAction(pathElement: PathElement): Action {
  return {
    type: 'exit-slice',
    sliceName: pathElement.sliceName,
    slicing: pathElement.slicing,
    slice: pathElement.slice
  };
}

function calculateExits(previousCount: number, commonPathCount: number, previousPath: PathElement[], newPath: PathElement[]): Action[] {
  const exits: Action[] = [];
  
  for (let i = previousCount; i > commonPathCount; i--) {
    const pathElement = previousPath[i - 1];
    if (pathElement.sliceName) {
      exits.push(createExitSliceAction(pathElement));
    }
    exits.push({ type: 'exit', el: pathElement.el });
  }
  
  if (commonPathCount > 0) {
    const previousElement = previousPath[commonPathCount - 1];
    const newElement = newPath[commonPathCount - 1];
    if (sliceChanged(previousElement, newElement)) {
      exits.push(createExitSliceAction(previousElement));
    }
  }
  
  return exits;
}

function calculateEnters(commonPathCount: number, newCount: number, exits: Action[], previousPath: PathElement[], newPath: PathElement[]): Action[] {
  const enters = [...exits];
  
  for (let i = commonPathCount; i < newCount; i++) {
    const pathElement = newPath[i];
    enters.push({ type: 'enter', el: pathElement.el });
    if (pathElement.sliceName) {
      enters.push({ type: 'enter-slice', sliceName: pathElement.sliceName });
    }
  }
  
  if (newCount === commonPathCount && commonPathCount > 0) {
    const previousElement = previousPath[commonPathCount - 1];
    const newElement = newPath[commonPathCount - 1];
    if (newElement?.sliceName && previousElement?.sliceName !== newElement.sliceName) {
      enters.push({ type: 'enter-slice', sliceName: newElement.sliceName });
    }
  }
  
  return enters;
}

function calculateActions(previousPath: PathElement[], newPath: PathElement[]): Action[] {
  const previousLength = previousPath.length;
  const newLength = newPath.length;
  const commonPathLength = getCommonPath(previousPath, newPath).length;
  
  const exits = calculateExits(previousLength, commonPathLength, previousPath, newPath);
  const enters = calculateEnters(commonPathLength, newLength, exits, previousPath, newPath);
  
  return enters;
}

function popAndUpdate<T>(stack: T[], updateFn: (parentValue: T, currentValue: T) => T): T[] {
  if (stack.length < 2) return stack;
  
  const currentValue = stack[stack.length - 1];
  const remainingStack = stack.slice(0, -1);
  const parentValue = remainingStack[remainingStack.length - 1];
  const baseStack = remainingStack.slice(0, -1);
  
  return [...baseStack, updateFn(parentValue, currentValue)];
}

function buildMatchForSlice(slicing: Slicing, sliceSchema: any): Record<string, any> {
  if (!slicing.discriminator) return {};
  
  return slicing.discriminator
    .filter(({ type: discriminatorType }) => !discriminatorType || ["pattern", "value"].includes(discriminatorType))
    .reduce((matchCriteria, { path: discriminatorPath }) => {
      if (discriminatorPath.trim() === "$this") {
        return { ...matchCriteria, ...sliceSchema.pattern?.value };
      } else {
        const pathSegments = discriminatorPath.split('.');
        // For path "a", look at sliceSchema.elements.a.pattern
        // For path "a.b", look at sliceSchema.elements.a.elements.b.pattern
        const nestedPath = ['elements'];
        for (let i = 0; i < pathSegments.length; i++) {
          if (i > 0) nestedPath.push('elements');
          nestedPath.push(pathSegments[i]);
        }
        const patternValue = getNestedValue(sliceSchema, [...nestedPath, 'pattern']);
        return setNestedValue(matchCriteria, pathSegments, patternValue?.value);
      }
    }, {});
}

function buildSliceNode(sliceSchema: any, matchCriteria: Record<string, any>, sliceConstraints: any): any {
  const sliceNode: any = { match: matchCriteria, schema: sliceSchema };
  
  if (sliceConstraints?.min !== undefined) {
    sliceNode.min = sliceConstraints.min;
  }
  
  if (sliceConstraints?.min && sliceConstraints.min > 1) {
    sliceNode._required = true;
  }
  
  if (sliceConstraints?.max !== undefined) {
    sliceNode.max = sliceConstraints.max;
  }
  
  return sliceNode;
}

function buildSlice(action: Action, parentValue: any, sliceSchema: any): any {
  const { sliceName, slicing, slice } = action;
  if (!sliceName || !slicing) return parentValue;
  
  const matchCriteria = buildMatchForSlice(slicing, sliceSchema);
  const sliceNode = buildSliceNode(sliceSchema, matchCriteria, slice);
  
  return {
    ...parentValue,
    slicing: {
      ...parentValue.slicing,
      ...slicing,
      slices: {
        ...parentValue.slicing?.slices,
        [sliceName]: sliceNode
      }
    }
  };
}

function slicingToExtensions(slicing: any): Record<string, any> {
  if (!slicing?.slicing?.slices) return {};
  
  return Object.entries(slicing.slicing.slices).reduce((acc, [k, slice]: [string, any]) => {
    const { match, schema, ...rest } = slice;
    return {
      ...acc,
      [k]: {
        url: match?.url,
        ...rest,
        ...schema
      }
    };
  }, {});
}

function addElement(elementName: string, parentValue: any, elementValue: any): any {
  const baseValue = elementName === 'extension' 
    ? { ...parentValue, extensions: slicingToExtensions(elementValue) }
    : parentValue;
    
  const { _required, ...cleanElementValue } = elementValue;
  const result = {
    ...baseValue,
    elements: {
      ...baseValue.elements,
      [elementName]: cleanElementValue
    }
  };
  
  if (elementValue._required) {
    result.required = [...(result.required || []), elementName];
  }
  
  return result;
}

function applyActions(valueStack: any[], actions: Action[], elementData: any): any[] {
  let stack = [...valueStack];
  
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const nextAction = actions[i + 1];
    // If next action is enter, we need empty value for intermediate path elements
    const currentValue = nextAction?.type === 'enter' ? {} : elementData;
    
    switch (action.type) {
      case 'enter':
        stack.push(currentValue);
        break;
      case 'enter-slice':
        stack.push(currentValue);
        break;
      case 'exit':
        if (action.el) {
          stack = popAndUpdate(stack, (parentValue, elementValue) => addElement(action.el!, parentValue, elementValue));
        }
        break;
      case 'exit-slice':
        stack = popAndUpdate(stack, (parentValue, sliceValue) => buildSlice(action, parentValue, sliceValue));
        break;
    }
  }
  
  return stack;
}

// Choice type detection and processing
function isChoice(element: ElementDefinition): boolean {
  if (element.path.endsWith("[x]")) return true;
  
  if (element.type && element.type.length > 1) {
    const uniqueCodes = new Set(element.type.map(typeInfo => typeInfo.code));
    return uniqueCodes.size > 1;
  }
  
  return false;
}

function capitalize(s: string): string {
  return s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function canonicalToName(nameOrUrl: string): string {
  return nameOrUrl.split('/').pop() || nameOrUrl;
}

function unionElements(element: ElementDefinition): ElementDefinition[] {
  const pathPrefix = element.path.replace(/\[x\]$/, '');
  const fieldPrefix = pathPrefix.split('.').pop() || '';
  
  const buildChoiceName = (prefix: string, typeCode: string) => prefix + capitalize(canonicalToName(typeCode));
  
  const typeElements = (element.type || []).map(typeInfo => {
    const { binding, ...elementWithoutBinding } = element;
    return {
      ...elementWithoutBinding,
      path: buildChoiceName(pathPrefix, typeInfo.code),
      type: [typeInfo],
      choiceOf: fieldPrefix
    };
  });
  
  const { type, ...baseElementWithoutType } = element;
  const baseElement = {
    ...baseElementWithoutType,
    path: pathPrefix,
    choices: (element.type || []).map(typeInfo => buildChoiceName(fieldPrefix, typeInfo.code))
  };
  
  return [baseElement, ...typeElements];
}

// Pattern processing
function patternTypeNormalize(n: string): string {
  const typeMap: Record<string, string> = {
    "Instant": "instant",
    "Time": "time", 
    "Date": "date",
    "DateTime": "dateTime",
    "Decimal": "decimal",
    "Boolean": "boolean",
    "Integer": "integer",
    "String": "string",
    "Uri": "uri",
    "Base64Binary": "base64Binary",
    "Code": "code",
    "Id": "id",
    "Oid": "oid",
    "UnsignedInt": "unsignedInt",
    "PositiveInt": "positiveInt",
    "Markdown": "markdown",
    "Url": "url",
    "Canonical": "canonical",
    "Uuid": "uuid"
  };
  
  return typeMap[n] || n;
}

function processPatterns(element: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  
  for (const [propertyName, propertyValue] of Object.entries(element)) {
    if (propertyName.startsWith("pattern")) {
      result.pattern = {
        type: patternTypeNormalize(propertyName.replace(/^pattern/, "")),
        value: propertyValue
      };
    } else if (propertyName.startsWith("fixed")) {
      result.pattern = {
        type: patternTypeNormalize(propertyName.replace(/^fixed/, "")),
        value: propertyValue
      };
    } else {
      result[propertyName] = propertyValue;
    }
  }
  
  if (!result.type && result.pattern?.type) {
    result.type = result.pattern.type;
  }
  
  return result;
}

// Reference processing
// function baseProfile(tp: string): boolean {
//   return /^http:\/\/hl7\.org\/fhir\/StructureDefinition\/[a-zA-Z]+$/.test(tp);
// }

function buildRefers(typeDefinitions: FHIRType[]): string[] {
  return typeDefinitions.flatMap(typeInfo => {
    if (!typeInfo.targetProfile) return [];
    
    const profiles = Array.isArray(typeInfo.targetProfile) ? typeInfo.targetProfile : [typeInfo.targetProfile];
    return profiles.filter(profile => typeof profile === 'string');
  })
  .filter((profile, index, arr) => arr.indexOf(profile) === index)
  .sort();
}

function preprocessElement(element: ElementDefinition): ElementDefinition {
  const primaryType = element.type?.[0]?.code;
  
  if (primaryType === "Reference") {
    const referenceTargets = buildRefers(element.type || []);
    return {
      ...element,
      type: [{ code: "Reference" }],
      ...(referenceTargets.length > 0 && { refers: referenceTargets })
    };
  }
  
  return element;
}

// Extension helpers
function getExtension(extensions: Extension[] | undefined, targetUrl: string): Extension | undefined {
  return extensions?.find(extension => extension.url === targetUrl);
}

const BINDING_NAME_EXT = "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName";
const DEFAULT_TYPE_EXT = "http://hl7.org/fhir/StructureDefinition/elementdefinition-defaulttype";

// Element building functions
function buildElementBinding(element: any, structureDefinition: StructureDefinition): any {
  const normalizeBinding = (binding: Binding) => {
    const bindingExtensions = binding.extension;
    const bindingNameExtension = getExtension(bindingExtensions, BINDING_NAME_EXT);
    
    const result: any = {
      ...(binding.strength && { strength: binding.strength }),
      ...(binding.valueSet && { valueSet: binding.valueSet })
    };
    
    if (bindingNameExtension?.valueString) {
      result.bindingName = bindingNameExtension.valueString;
    }
    
    return result;
  };
  
  if (element.choices) {
    const { binding, ...elementWithoutBinding } = element;
    return elementWithoutBinding;
  }
  
  if (element.choiceOf) {
    const declarationPath = `${structureDefinition.id}.${element.choiceOf}[x]`;
    const declaration = structureDefinition.snapshot?.element.find(el => el.path === declarationPath);
    
    if (declaration?.binding) {
      const normalizedBinding = normalizeBinding(declaration.binding);
      if (normalizedBinding && Object.keys(normalizedBinding).length > 0) {
        return { ...element, binding: normalizedBinding };
      }
    }
    return element;
  }
  
  if (element.binding?.valueSet) {
    const normalizedBinding = normalizeBinding(element.binding);
    if (normalizedBinding && Object.keys(normalizedBinding).length > 0) {
      return { ...element, binding: normalizedBinding };
    }
  }
  
  const { binding, ...elementWithoutBinding } = element;
  return elementWithoutBinding;
}

function buildElementConstraints(element: any): any {
  if (!element.constraint) return element;
  
  const constraints = element.constraint.reduce((constraintMap: Record<string, any>, constraint: Constraint) => {
    const { key, xpath, ...constraintData } = constraint;
    constraintMap[key] = constraintData;
    return constraintMap;
  }, {});
  
  return { ...element, constraint: constraints };
}

function parseMax(element: { max?: string }): number | undefined {
  if (!element.max || element.max === "*") return undefined;
  const parsed = parseIntSafe(element.max);
  return parsed || undefined;
}

function parseMin(element: { min?: number }): number | undefined {
  return element.min && element.min > 0 ? element.min : undefined;
}

function buildElementExtension(element: any): any {
  const primaryType = element.type?.[0]?.code;
  const extensionUrl = primaryType === "Extension" ? element.type?.[0]?.profile?.[0] : undefined;
  const minCardinality = parseMin(element);
  const maxCardinality = parseMax(element);
  
  if (!extensionUrl) return element;
  
  return {
    ...element,
    url: extensionUrl,
    ...(minCardinality && { min: minCardinality }),
    ...(maxCardinality && { max: maxCardinality })
  };
}

function buildElementCardinality(element: any): any {
  const minCardinality = parseMin(element);
  const maxCardinality = parseMax(element);
  const { min, max, ...elementWithoutCardinality } = element;
  
  if (element.url) return elementWithoutCardinality;
  
  let result = elementWithoutCardinality;
  
  if (arrayElement(element)) {
    result = {
      ...result,
      array: true,
      ...(minCardinality && { min: minCardinality }),
      ...(maxCardinality && { max: maxCardinality })
    };
  }
  
  if (requiredElement(element)) {
    result._required = true;
  }
  
  return result;
}

function extractTypeFromExtension(element: any): string | undefined {
  const typeExtension = element.type?.[0]?.extension?.[0];
  
  if (typeExtension?.url === "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type") {
    return typeExtension.valueUrl;
  }
  
  return undefined;
}

function warn(msg: string): void {
  console.warn(`WARNING: ${msg}`);
}

function buildElementType(element: any, structureDefinition: StructureDefinition): any {
  if (element.type && element.type.length > 1) {
    warn(`More than one type specified: ${JSON.stringify(element.type)}`);
  }
  
  const typeFromExtension = extractTypeFromExtension(element);
  const defaultTypeExtension = getExtension(element.extension, DEFAULT_TYPE_EXT);
  const primaryTypeCode = element.type?.[0]?.code;
  
  let result = element;
  
  if (typeFromExtension && typeFromExtension.trim() !== '') {
    result = { ...result, type: typeFromExtension };
  } else if (element.type && primaryTypeCode && primaryTypeCode.trim() !== '') {
    result = { ...result, type: primaryTypeCode };
  }
  
  if (structureDefinition.kind === "logical" && defaultTypeExtension?.valueCanonical) {
    result = { ...result, defaultType: defaultTypeExtension.valueCanonical };
  }
  
  return result;
}

function clearElement(element: any): any {
  const { 
    path, slicing, sliceName, id, mapping, example, alias, 
    condition, comment, definition, requirements, ...cleanElement 
  } = element;
  return cleanElement;
}

function contentReferenceToElementReference(contentReference: string, structureDefinition: StructureDefinition): string[] {
  const pathParts = contentReference.substring(1).split('.');
  const [, ...parts] = pathParts;
  
  const result = [structureDefinition.url];
  for (const part of parts) {
    result.push("elements", part);
  }
  
  return result;
}

function buildElementContentReference(element: any, structureDefinition: StructureDefinition): any {
  const contentReference = element.contentReference;
  if (!contentReference) return element;
  
  const { contentReference: _, ...elementWithoutReference } = element;
  return {
    ...elementWithoutReference,
    elementReference: contentReferenceToElementReference(contentReference, structureDefinition)
  };
}

function buildElement(element: ElementDefinition, structureDefinition: StructureDefinition): any {
  return [
    preprocessElement,
    clearElement,
    (el: any) => buildElementBinding(el, structureDefinition),
    buildElementConstraints,
    (el: any) => buildElementContentReference(el, structureDefinition),
    buildElementExtension,
    buildElementCardinality,
    (el: any) => buildElementType(el, structureDefinition),
    processPatterns,
    (el: any) => {
      const { extension, ...elementWithoutExtension } = el;
      return elementWithoutExtension;
    }
  ].reduce((processedElement, processingFunction) => processingFunction(processedElement), element);
}

// Main translation function
function buildResourceHeader(structureDefinition: StructureDefinition): any {
  const { name, type, url, version, description, package_name, package_version, package_id, kind, derivation, baseDefinition } = structureDefinition;
  
  const result: any = {
    ...(name && { name }),
    ...(type && { type }),
    url,
    ...(version && { version }),
    ...(description && { description }),
    ...(package_name && { package_name }),
    ...(package_version && { package_version }),
    ...(package_id && { package_id }),
    ...(kind && { kind }),
    ...(derivation && { derivation }),
    ...(baseDefinition && { base: baseDefinition }),
    ...(structureDefinition.abstract && { abstract: true }),
    class: (() => {
      if (type === "Extension") return "extension";
      if (kind === "resource" && derivation === "constraint") return "profile";
      if (kind === "resource") return "resource";
      return kind || "unknown";
    })()
  };
  
  return result;
}

function getDifferential(structureDefinition: StructureDefinition): ElementDefinition[] {
  return structureDefinition.differential?.element.filter(el => el.path.includes('.')) || [];
}

function normalizeFhirSchema(schema: any): any {
  function walkObject(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(walkObject).sort();
    } else if (obj && typeof obj === 'object') {
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = walkObject(value);
      }
      return result;
    }
    return obj;
  }
  
  return walkObject(schema);
}

// Helper functions for nested object operations
function getNestedValue(obj: any, path: string[]): any {
  return path.reduce((current, key) => current?.[key], obj);
}

function setNestedValue(obj: any, path: string[], value: any): any {
  const result = { ...obj };
  let current = result;
  
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[path[path.length - 1]] = value;
  return result;
}

export interface TranslateOptions {
  packageMeta?: any;
}

export function translate(structureDefinition: StructureDefinition, options: TranslateOptions = {}): any {
  const isPrimitive = structureDefinition.kind === "primitive-type";
  const resourceHeader = buildResourceHeader(structureDefinition);
  
  if (options.packageMeta) {
    resourceHeader.package_meta = options.packageMeta;
  }
  
  if (isPrimitive) {
    return normalizeFhirSchema(resourceHeader);
  }
  
  const EMPTY_PATH: PathElement[] = [];
  let valueStack = [resourceHeader];
  let previousPath = EMPTY_PATH;
  let remainingElements = getDifferential(structureDefinition);
  let elementIndex = 0;
  
  while (remainingElements.length > 0) {
    const currentElement = remainingElements.shift()!;
    
    if (isChoice(currentElement)) {
      const expandedElements = unionElements(currentElement);
      remainingElements.unshift(...expandedElements);
      elementIndex++;
      continue;
    }
    
    const currentPath = enrichPath(previousPath, parsePath(currentElement));
    const pathActions = calculateActions(previousPath, currentPath);
    const processedElement = { ...buildElement(currentElement, structureDefinition), index: elementIndex };
    valueStack = applyActions(valueStack, pathActions, processedElement);
    
    previousPath = currentPath;
    elementIndex++;
  }
  
  // Final cleanup
  const finalActions = calculateActions(previousPath, EMPTY_PATH);
  valueStack = applyActions(valueStack, finalActions, { index: elementIndex });
  
  if (valueStack.length !== 1) {
    throw new Error("Expected exactly one element in value stack");
  }
  
  return normalizeFhirSchema(valueStack[0]);
}