
  function formatTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;

    return null; // Return null for non-today dates
  }

  function formatDateTime(dateString, isFullDate = false) {
    const date = new Date(dateString);
    const now = new Date();

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const fullDate = `${day} ${month} ${year} at ${time}`;

    // Today (Show time ago)
    const timeAgo = formatTimeAgo(date);
    if (!isFullDate && timeAgo) return timeAgo;

    // Yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (
      !isFullDate &&
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return `Yesterday at ${time}`;
    }

    // Current Year (Show "8 March at 08:39 PM")
    if (!isFullDate && date.getFullYear() === now.getFullYear()) {
      return `${day} ${month} at ${time}`;
    }

    // Previous Years (Show "8 March, 2023")
    return isFullDate ? fullDate : `${day} ${month}, ${year}`;
  }

  function fetchPostDates(postElement, postId, blogId) {
    if (!postId || !blogId) return;

    var script = document.createElement("script");
    script.src = `https://www.blogger.com/feeds/${blogId}/posts/default/${postId}?alt=json-in-script&callback=handleBlogPosts`;
    script.dataset.postId = postId;
    document.body.appendChild(script);
  }

  function handleBlogPosts(response) {
    const post = response.entry;
    if (!post) return;

    const postId = post.id.$t.split("post-")[1];
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    if (!postElement) return;

    // Extract dates
    const postPublished = post.published ? post.published.$t : null;
    const postUpdated = post.updated ? post.updated.$t : null;

    let formattedDate = "";
    let fullDate = "";

    const datesMatch = postPublished === postUpdated;

    if (postPublished && postUpdated) {
      // If dates match, show only formatted published date
      formattedDate = formatDateTime(postPublished);
      fullDate = `Published: ${formatDateTime(postPublished, true)}`;
      if (!datesMatch) {
        fullDate += ` | Updated: ${formatDateTime(postUpdated, true)}`;
      }
    } else if (postPublished) {
      // Show formatted published date if no update date
      formattedDate = formatDateTime(postPublished);
      fullDate = `Published: ${formatDateTime(postPublished, true)}`;
    }

    // Insert into the correct spans
    postElement.querySelector(".formatted-date").textContent = formattedDate;
    postElement.querySelector(".full-date").textContent = fullDate;

    // Show full date on hover or click
    const formattedDateElement = postElement.querySelector('.formatted-date');
    const fullDateElement = postElement.querySelector('.full-date');

    // Hover to show full date
    formattedDateElement.addEventListener('mouseenter', () => {
      fullDateElement.style.display = 'block';
    });

    // Hover out to hide full date
    formattedDateElement.addEventListener('mouseleave', () => {
      fullDateElement.style.display = 'none';
    });

    // Click to toggle full date visibility
    formattedDateElement.addEventListener('click', () => {
      const isVisible = fullDateElement.style.display === 'block';
      fullDateElement.style.display = isVisible ? 'none' : 'block';
    });

    // Hide updated full date if dates match
    if (datesMatch) {
      const updateFullDateElement = postElement.querySelector('.updated-full-date');
      if (updateFullDateElement) {
        updateFullDateElement.style.display = 'none';
      }
    }
  }

  function processVisiblePosts() {
    document.querySelectorAll("[data-post-id]:not([data-date-fetched])").forEach((postElement) => {
      const postId = postElement.getAttribute("data-post-id");
      const blogId = postElement.getAttribute("data-blog-id");

      if (postId && blogId) {
        fetchPostDates(postElement, postId, blogId);
        postElement.setAttribute("data-date-fetched", "true");
      }
    });
  }

  // Observe for infinite scroll
  const observer = new MutationObserver(processVisiblePosts);
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener("DOMContentLoaded", processVisiblePosts);
