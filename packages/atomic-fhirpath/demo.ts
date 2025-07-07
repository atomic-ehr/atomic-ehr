import { parse_fhirpath } from './src/parser.js';


function evaluate(fhirpath: string, data: any){
    let ast = parse_fhirpath({},fhirpath);
    try{
        return ast.ast.eval(null, data);
    }catch(e){
        console.error('ERROR', ast.ast);
        return null;
    }
}

let patient = { 
    resourceType: "Patient",
    name: [{family: "Doe"}, {family: "Smith"}],
    contact: [{system: "phone", value: "1234567890"}]
}

console.log(evaluate("Patient.name.family", patient));
console.log(evaluate("1 = 1", patient));
console.log(evaluate("1 = 2", patient));

//console.log(evaluate("Patient.contact.where(system = 'phone').value", patient));