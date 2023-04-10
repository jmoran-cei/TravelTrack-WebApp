export interface IdTokenClaims {
  oid: string;
  given_name: string;
  family_name: string;
  newUser: boolean;
  tfp: string; // policy used
}
