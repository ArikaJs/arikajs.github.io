document.addEventListener('DOMContentLoaded', () => {
    // Inject copy buttons into all code blocks
    const codeBlocks = document.querySelectorAll('.code-block pre');
    
    codeBlocks.forEach((block) => {
        // Create the button
        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        
        // Use a sleek SVG icon
        button.innerHTML = `
            <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span class="btn-text">Copy</span>
        `;
        
        // Wrap everything in a relative container
        const wrapper = block.parentElement;
        wrapper.style.position = 'relative';
        wrapper.appendChild(button);

        button.addEventListener('click', () => {
            const text = block.querySelector('code').innerText.trim();
            navigator.clipboard.writeText(text).then(() => {
                const btnText = button.querySelector('.btn-text');
                const originalHtml = button.innerHTML;
                
                button.classList.add('copied');
                btnText.innerText = 'Copied!';
                
                setTimeout(() => {
                    button.classList.remove('copied');
                    btnText.innerText = 'Copy';
                }, 2000);
            });
        });
    });
});
