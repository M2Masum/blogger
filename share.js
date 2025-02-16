    
        const shareButton = document.getElementById('shareButton');
        const shareDrawer = document.getElementById('shareDrawer');
        const closeDrawer = document.getElementById('closeDrawer');
        const overlay = document.getElementById('overlay');
        const toast = document.getElementById('toast');

        const postUrl = encodeURIComponent("https://example.com"); // URL to share
        const postTitle = encodeURIComponent(document.getElementById('postTitle').innerText); // Post title
        const postSnippet = encodeURIComponent(document.getElementById('postSnippet').innerText); // Post snippet

        // Share platforms data
        const sharePlatforms = [
            {
                id: 'emailButton',
                className: 'email-button',
                label: 'Email',
                icon: '<svg class="icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
                action: () => {
                    const subject = `Check this out: ${postTitle}`;
                    const body = `${postSnippet}\n\nRead more: ${postUrl}`;
                    window.open(`mailto:?subject=${subject}&body=${body}`);
                }
            },
            {
                id: 'xButton',
                className: 'x-button',
                label: 'X',
                icon: '<svg class="icon" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
                action: () => {
                    const text = `${postTitle} - ${postSnippet}`;
                    window.open(`https://twitter.com/intent/tweet?url=${postUrl}&text=${text}`, '_blank');
                }
            },
            {
                id: 'facebookButton',
                className: 'facebook-button',
                label: 'Facebook',
                icon: '<svg class="icon" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
                action: () => {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`, '_blank');
                }
            },
            {
                id: 'pinterestButton',
                className: 'pinterest-button',
                label: 'Pinterest',
                icon: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.14 2.56 7.68 6.18 9.12-.09-.78-.17-1.98.03-2.82.19-.84 1.22-5.32 1.22-5.32s-.31-.62-.31-1.53c0-1.43.83-2.5 1.86-2.5.88 0 1.3.66 1.3 1.45 0 .88-.56 2.2-.85 3.42-.24 1.02.51 1.85 1.52 1.85 1.82 0 3.22-1.92 3.22-4.7 0-2.46-1.77-4.18-4.3-4.18-2.93 0-4.65 2.2-4.65 4.47 0 .88.34 1.82.76 2.33.08.1.09.19.07.29-.07.31-.23.98-.27 1.13-.04.18-.13.22-.3.13-1.12-.52-1.82-2.15-1.82-3.46 0-2.82 2.05-5.41 5.91-5.41 3.1 0 5.5 2.2 5.5 5.17 0 3.08-1.94 5.56-4.63 5.56-.9 0-1.75-.47-2.04-1.02-.58 1.74-2.24 2.99-4.06 2.99-1.5 0-2.73-1.16-2.73-2.6 0-1.5 1.07-2.74 2.3-2.74.72 0 1.37.31 1.8.82.2.24.38.22.54.16.83-.06.25-.2.84-.23 1.06-.04.34-.44.46-.64.34-1.89-.88-2.75-3.64-2.75-5.86 0-4.75 3.45-9.1 9.8-9.1 5.14 0 9.15 3.65 9.15 8.53 0 5.1-3.22 9.2-7.69 9.2-1.5 0-2.92-.78-3.4-1.7-.76 1.48-1.9 2.6-3.2 2.6-.6 0-1.17-.23-1.6-.66-.43-.43-.66-1-.66-1.6 0-.6.23-1.17.66-1.6.43-.43 1-.66 1.6-.66.6 0 1.17.23 1.6.66.43.43.66 1 .66 1.6 0 .6-.23 1.17-.66 1.6z"/></svg>',
                action: () => {
                    const media = 'https://example.com/image.jpg'; // Replace with the actual image URL
                    const description = `${postTitle} - ${postSnippet}`;
                    window.open(`https://pinterest.com/pin/create/button/?url=${postUrl}&media=${media}&description=${description}`, '_blank');
                }
            },
            {
                id: 'whatsappButton',
                className: 'whatsapp-button',
                label: 'WhatsApp',
                icon: '<svg class="icon" viewBox="0 0 24 24"><path d="M17.5 6.5a10 10 0 0 0-16.5 7.5c0 2.1.6 4 1.6 5.6L0 24l4.9-1.3c1.6 1 3.5 1.6 5.6 1.6 5.5 0 10-4.5 10-10 0-2.7-1.1-5.2-2.9-7.1zm-2.9 12.4c-1.4 0-2.7-.4-3.8-1l-.6-.3-2.6.7.7-2.5-.3-.6c-.6-1.1-1-2.4-1-3.8 0-4.1 3.3-7.5 7.5-7.5 2 0 3.9.8 5.3 2.2 1.4 1.4 2.2 3.3 2.2 5.3 0 4.1-3.3 7.5-7.5 7.5zM20 10c0-.3-.2-.5-.5-.5h-2c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5h2c.3 0 .5-.2.5-.5v-2zm-5 0c0-.3-.2-.5-.5-.5h-2c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5h2c.3 0 .5-.2.5-.5v-2zm-5 0c0-.3-.2-.5-.5-.5h-2c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5h2c.3 0 .5-.2.5-.5v-2z"/></svg>',
                action: () => {
                    const text = `${postTitle} - ${postSnippet}\n\nRead more: ${postUrl}`;
                    window.open(`https://wa.me/?text=${text}`, '_blank');
                }
            },
            {
                id: 'linkedinButton',
                className: 'linkedin-button',
                label: 'LinkedIn',
                icon: '<svg class="icon" viewBox="0 0 24 24"><path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.7a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zM20 19h-3v-5.6c0-1.3-.5-2.2-1.7-2.2-1.4 0-2 1-2 2.2V19h-3V8h3v1.5h.1c.5-.9 1.6-1.7 3.3-1.7 3.5 0 4.2 2.3 4.2 5.3V19z"/></svg>',
                action: () => {
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`, '_blank');
                }
            },
            {
                id: 'redditButton',
                className: 'reddit-button',
                label: 'Reddit',
                icon: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.5 9.5c0-.8-.7-1.5-1.5-1.5-.8 0-1.5.7-1.5 1.5 0 .8.7 1.5 1.5 1.5.8 0 1.5-.7 1.5-1.5zM10 8c-.8 0-1.5.7-1.5 1.5S9.2 11 10 11s1.5-.7 1.5-1.5S10.8 8 10 8zm6.5 6.5c-1.5 1.5-4.1 1.5-5.5 0-1.5-1.5-4.1-1.5-5.5 0-.2.2-.2.5 0 .7 1.5 1.5 4.1 1.5 5.5 0 1.5 1.5 4.1 1.5 5.5 0 .2-.2.2-.5 0-.7z"/></svg>',
                action: () => {
                    const text = `${postTitle} - ${postSnippet}`;
                    window.open(`https://www.reddit.com/submit?url=${postUrl}&title=${text}`, '_blank');
                }
            },
            {
                id: 'telegramButton',
                className: 'telegram-button',
                label: 'Telegram',
                icon: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.9 8.2l-2.2 10.4c-.2.8-.7 1-1.4.6l-3.8-2.8-1.8 1.7c-.2.2-.4.3-.7.3l.2-3.8 7.1-6.4c.3-.3 0-.4-.4-.1l-8.8 5.6-3.8-1.2c-.8-.2-.8-.7.2-1l14.8-5.7c.7-.2 1.3.2 1 1.1z"/></svg>',
                action: () => {
                    const text = `${postTitle} - ${postSnippet}\n\nRead more: ${postUrl}`;
                    window.open(`https://t.me/share/url?url=${postUrl}&text=${text}`, '_blank');
                }
            },
            {
                id: 'copyLink',
                className: 'copy-link-button',
                label: 'Copy Link',
                icon: '<svg class="icon" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',
                action: () => {
                    const dummy = document.createElement('textarea');
                    dummy.value = postUrl;
                    document.body.appendChild(dummy);
                    dummy.select();
                    document.execCommand('copy');
                    document.body.removeChild(dummy);

                    // Show toast notification
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 3000); // Hide after 3 seconds

                    // Close the drawer
                    closeDrawerFunc();
                }
            }
        ];

        // Function to create share buttons
        function createShareButtons() {
            const shareOptions = document.createElement('div');
            shareOptions.className = 'share-options';

            sharePlatforms.forEach(platform => {
                const button = document.createElement('button');
                button.id = platform.id;
                button.className = platform.className;
                button.innerHTML = `${platform.icon} ${platform.label}`;
                button.addEventListener('click', platform.action);
                shareOptions.appendChild(button);
            });

            shareDrawer.appendChild(shareOptions);
        }

        // Initialize share buttons
        createShareButtons();

        function openDrawer() {
            shareDrawer.style.transform = 'translateY(0)';
            overlay.style.display = 'block';
        }

        function closeDrawerFunc() {
            shareDrawer.style.transform = 'translateY(100%)';
            overlay.style.display = 'none';
        }

        shareButton.addEventListener('click', openDrawer);
        closeDrawer.addEventListener('click', closeDrawerFunc);
        overlay.addEventListener('click', closeDrawerFunc);
    
