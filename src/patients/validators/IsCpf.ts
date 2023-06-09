import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'isCpf', async: false })
export class IsCpf implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return cpf.isValid(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Not a valid cpf!';
  }
}