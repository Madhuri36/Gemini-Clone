<h1>Gemini Clone</h1>

<p>A modern AI chat app inspired by Gemini with:</p>
<ul>
  <li> Text generation</li>
  <li> Light/Dark themes</li>
  <li> Custom gradient color options</li>
  <li> User authentication</li>
  <li> Recent chat history</li>
</ul>

<hr />

<h2>Features</h2>
<ul>
  <li><strong>Text Generation</strong> using Gemini API (or similar)</li>
  <li><strong>Auth:</strong> Sign up & login with secure JWT cookies</li>
  <li><strong>Themes:</strong> Light/Dark toggle & color customization</li>
  <li><strong>Chat History:</strong> Stored locally per user session</li>
  <li><strong>Responsive UI</strong> built with React + Tailwind</li>
</ul>

<hr />

<h2>🛠 Setup</h2>
<ol>
  <li><strong>Clone & Install</strong>
    <pre><code>git clone https://github.com/Madhuri36/Gemini-Clone.git
cd gemini-clone</code></pre>
  </li>
  <li><strong>Backend</strong>
    <pre><code>cd backend
npm install</code></pre>
  </li>
  <li><strong>Frontend</strong>
    <pre><code>cd frontend
npm install</code></pre>
  </li>
  <li><strong>.env (in backend)</strong>
    <pre><code>PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key</code></pre>
  </li>
  <li><strong>Run</strong>
    <pre><code># Backend
npm run dev
# Frontend
npm start</code></pre>
  </li>
</ol>

<hr />

<h2> Tech Stack</h2>
<ul>
  <li>React, Tailwind CSS, TypeScript</li>
  <li>Node, Express, MongoDB, Gemini API</li>
  <li>JWT Auth, Context API</li>
</ul>

<hr />

<h2>🔮 Future Scope</h2>
<ul>
  <li>🖼️ Image generation (ClipDrop API)</li>
  <li>📎 File uploads & context-aware chat</li>
</ul>

<hr />
