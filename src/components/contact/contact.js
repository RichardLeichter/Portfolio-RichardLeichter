const copyBtn = document.getElementById('copyEmailBtn');
const emailText = document.getElementById('emailText');

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const email = emailText.innerText;
        navigator.clipboard.writeText(email).then(() => {
            const originalText = emailText.innerText;
            emailText.innerText = "Email Copiado!";
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                emailText.innerText = originalText;
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });
}