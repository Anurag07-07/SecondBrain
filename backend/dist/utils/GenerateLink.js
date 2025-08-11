import crypto from 'crypto';
function CreateHash(data) {
    const alphabet = "qwertyuioplkjhgfdsazxcvbnm789456123";
    let hash = "";
    for (let i = 0; i < alphabet.length; i++) {
        hash += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return hash;
}
export default CreateHash;
//# sourceMappingURL=GenerateLink.js.map