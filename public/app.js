const API_URL = 'http://localhost:3000/api/blogs';
const app = document.getElementById('app');

// Simple router
function navigate(route, param) {
  window.history.pushState({}, '', param ? `#${route}/${param}` : `#${route}`);
  render();
}

window.onpopstate = render;

document.querySelectorAll('.nav-link').forEach(link => {
  link.onclick = (e) => {
    navigate(e.target.dataset.route);
  };
});

async function fetchBlogs() {
  const res = await fetch(API_URL);
  return await res.json();
}

async function fetchBlog(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}

// Format date as "Month day, year"
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

// Render blog list
async function renderBlogList() {
  const blogs = await fetchBlogs();
  app.innerHTML = `<div class="blog-list">
    ${blogs.map(blog => `
      <div class="blog-list-item">
        <span class="blog-date">${formatDate(blog.date)}</span>
        <a class="blog-title" onclick="navigate('blog', '${blog._id}')">${blog.title}</a>
      </div>
    `).join('')}
  </div>`;
}

// Render single blog
async function renderBlog(id) {
  const blog = await fetchBlog(id);
  app.innerHTML = `
    <div class="blog-content">
      <div class="blog-content-title">${blog.title}</div>
      <div class="blog-date">${formatDate(blog.date)}</div>
      <div class="blog-content-body">${blog.body}</div>
      <a class="nav-link" onclick="navigate('blog')">← Back</a>
    </div>
  `;
}

// Main render function
function render() {
  const hash = window.location.hash.replace('#', '');
if (hash === 'blog') {
    renderBlogList();
  } else if (hash.startsWith('blog/')) {
    const id = hash.split('/')[1];
    renderBlog(id);
  }
}

// Expose navigate globally for inline onclick
window.navigate = navigate;

// Initial render
render();
