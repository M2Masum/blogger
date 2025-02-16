    
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
                icon: '<svg  class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-8.59 -8.59 446.89 446.89" xml:space="preserve" fill="#fff" stroke="#fff" stroke-width="8.59418"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#fff" stroke-width="12.031852"></g><g id="SVGRepo_iconCarrier"> <g> <path style="fill:#fff;" d="M429.709,196.618c0-29.803-24.16-53.962-53.963-53.962c-14.926,0-28.41,6.085-38.176,15.881 c-30.177-19.463-68.73-31.866-111.072-33.801c0.026-17.978,8.078-34.737,22.104-45.989c14.051-11.271,32.198-15.492,49.775-11.588 l2.414,0.536c-0.024,0.605-0.091,1.198-0.091,1.809c0,24.878,20.168,45.046,45.046,45.046s45.046-20.168,45.046-45.046 c0-24.879-20.168-45.046-45.046-45.046c-15.997,0-30.01,8.362-38.002,20.929l-4.317-0.959c-24.51-5.446-49.807,0.442-69.395,16.156 c-19.564,15.695-30.792,39.074-30.818,64.152c-42.332,1.934-80.878,14.331-111.052,33.785c-9.767-9.798-23.271-15.866-38.2-15.866 C24.16,142.656,0,166.815,0,196.618c0,20.765,11.75,38.755,28.946,47.776c-1.306,6.68-1.993,13.51-1.993,20.462 c0,77.538,84.126,140.395,187.901,140.395s187.901-62.857,187.901-140.395c0-6.948-0.687-13.775-1.991-20.452 C417.961,235.381,429.709,217.385,429.709,196.618z M345.746,47.743c12,0,21.762,9.762,21.762,21.762 c0,11.999-9.762,21.761-21.762,21.761s-21.762-9.762-21.762-21.761C323.984,57.505,333.747,47.743,345.746,47.743z M23.284,196.618 c0-16.916,13.762-30.678,30.678-30.678c7.245,0,13.895,2.538,19.142,6.758c-16.412,14.08-29.118,30.631-37.007,48.804 C28.349,215.937,23.284,206.868,23.284,196.618z M333.784,345.477c-31.492,23.53-73.729,36.489-118.929,36.489 s-87.437-12.959-118.929-36.489c-29.462-22.013-45.688-50.645-45.688-80.621c0-29.977,16.226-58.609,45.688-80.622 c31.492-23.53,73.729-36.489,118.929-36.489s87.437,12.959,118.929,36.489c29.462,22.013,45.688,50.645,45.688,80.622 C379.471,294.832,363.246,323.464,333.784,345.477z M393.605,221.488c-7.891-18.17-20.596-34.716-37.005-48.794 c5.247-4.22,11.901-6.754,19.147-6.754c16.916,0,30.678,13.762,30.678,30.678C406.424,206.867,401.353,215.925,393.605,221.488z"></path> <circle style="fill:#fff;" cx="146.224" cy="232.074" r="24.57"></circle> <circle style="fill:#fff;" cx="283.484" cy="232.074" r="24.57"></circle> <path style="fill:#fff;" d="M273.079,291.773c-17.32,15.78-39.773,24.47-63.224,24.47c-26.332,0-50.729-10.612-68.696-29.881 c-4.384-4.704-11.751-4.96-16.454-0.575c-4.703,4.384-4.96,11.752-0.575,16.454c22.095,23.695,53.341,37.285,85.726,37.285 c29.266,0,57.288-10.847,78.905-30.543c4.752-4.33,5.096-11.694,0.765-16.446C285.197,287.788,277.838,287.44,273.079,291.773z"></path> </g> </g></svg>',
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
    
