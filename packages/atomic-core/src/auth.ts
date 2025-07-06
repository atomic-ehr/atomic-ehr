import type { AtomicContext } from "./context";
import type { AtomicResource } from "./resource";

export interface AuthClient extends AtomicResource {}
export interface AuthUser extends AtomicResource { }
export interface AuthPractitioner extends AtomicResource { }
export interface AuthPractitionerRole extends AtomicResource { }
export interface AuthOrganization extends AtomicResource { }
export interface AuthGroup extends AtomicResource { }
export interface AuthCareTeam extends AtomicResource { }
export interface AuthLocation extends AtomicResource { }
export interface AuthPatient extends AtomicResource { }

// maybe Authorization
export interface AuthSession {
  identityProvider: string;

  subject: 'user' | 'client';

  client?: AuthClient;
  user?: AuthUser;

  // FHIR linkage
  patient?: AuthPatient;
  practitioner?: AuthPractitioner;
  practitionerRoles?: AuthPractitionerRole[];
  organizations?: AuthOrganization[];
  groups?: AuthGroup[];
  careTeams?: AuthCareTeam[];
  locations?: AuthLocation[];

  accessToken?: string;       
  issuedAt?: number;          
  expiresAt?: number;         
  scopes?: string[];          

  [key: string]: any;
}

export type MaybeAuthSession = AuthSession | undefined;

export type AuthorizationDecision = 'authorized' | 'denied' | undefined;

interface AuthenticationDebugInfo {  
  decision: AuthorizationDecision;
  reason: string;
}

export interface AuthorizationDebugInfo {  
  decision: AuthorizationDecision;
  reason: string;
}

export interface Operation {
  type: 'read' | 'write' | 'search' | 'other';
  resourceType: string;
}

export interface AuditEvent {
  request: Request;
  operation: Operation;
  session: AuthSession;
  authorization: AuthorizationDecision;
}

export interface AuditContext {
  request: Request;
  session: AuthSession;
  operation: Operation;
}

export interface QuoteLimits {
  request: Request;
  session: AuthSession;
  operation: Operation;
}

export interface Stats {
  requests: number;
  errors: number;
  limits: QuoteLimits;
}

export interface AtomicAuthConfig {
    matchRoutes: string[];
}

/*
* Base class for authentication, authorization and audit
*/

export abstract class AtomicAuth {
  context: AtomicContext;
  config: AtomicAuthConfig;

  constructor(context: AtomicContext, config: AtomicAuthConfig ) {
    this.context = context;
    this.config = config;
  }

  async init(): Promise<void> { return Promise.resolve(); }

  async authenticate(context: AtomicContext, request: Request): Promise<MaybeAuthSession> {
    return undefined;
  }
  
  async debugAuthenticate(context: AtomicContext, request: Request): Promise<AuthenticationDebugInfo> {
    throw new Error('Method not implemented.');
  }
  
  async authorize(context: AtomicContext, request: Request, session: MaybeAuthSession): Promise<AuthorizationDecision> {
    throw new Error('Method not implemented.');
  }
  
  async debugAuthorize(context: AtomicContext, request: Request, session: MaybeAuthSession): Promise<AuthorizationDebugInfo> {
    throw new Error('Method not implemented.');
  }
  
  async quoteLimits(context: AtomicContext, request: Request, session: AuthSession, stats: Stats): Promise<QuoteLimits> {
    throw new Error('Method not implemented.');
  }

  // Audit events
  async onAuthenticationFailed(context: AtomicContext, event: AuditContext): Promise<AuditEvent> {
    throw new Error('Method not implemented.');
  }
  
  async onAuthenticationSuccess(context: AtomicContext, event: AuditContext): Promise<AuditEvent> {
    throw new Error('Method not implemented.');
  }
  
  async onAuthorizationFailed(context: AtomicContext, event: AuditContext): Promise<AuditEvent> {
    throw new Error('Method not implemented.');
  }
  
  async onAuthorizationSuccess(context: AtomicContext, event: AuditContext): Promise<AuditEvent> {
    throw new Error('Method not implemented.');
  }
  
  async onLimitsExceeded(context: AtomicContext, event: AuditContext): Promise<AuditEvent> {
    throw new Error('Method not implemented.');
  }

  async onRequest(context: AtomicContext, event: AuditContext): Promise<AuditEvent> {
    throw new Error('Method not implemented.');
  }
  
  async onResponse(context: AtomicContext, event: AuditContext): Promise<AuditEvent> {
    throw new Error('Method not implemented.');
  }
  
  async onError(context: AtomicContext, event: AuditContext): Promise<AuditEvent> {
    throw new Error('Method not implemented.');
  }
}