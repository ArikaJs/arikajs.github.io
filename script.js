document.addEventListener('DOMContentLoaded', () => {
    // Inject copy buttons into all code blocks
    const codeBlocks = document.querySelectorAll('.code-block pre');
    
    codeBlocks.forEach((block) => {
        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.innerText = '📋 Copy';
        
        // Wrap everything in a relative container
        const wrapper = block.parentElement;
        wrapper.style.position = 'relative';
        wrapper.appendChild(button);

        button.addEventListener('click', () => {
            const text = block.innerText;
            navigator.clipboard.writeText(text).then(() => {
                button.innerText = '✅ Copied!';
                button.classList.add('copied');
                setTimeout(() => {
                    button.innerText = '📋 Copy';
                    button.classList.remove('copied');
                }, 2000);
            });
        });
    });
});
