export default interface IHashProvider {
  hash(plaintext: string): Promise<string>,
  verify(hash: string, plaintext: string): Promise<boolean>
}
