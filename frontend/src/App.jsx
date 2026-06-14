import React, { useState } from 'react';
import './index.css';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });
      
      setLoading(false);
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      
      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const currentMessages = [...prev];
            const lastMessage = { ...currentMessages[currentMessages.length - 1] };
            lastMessage.content = lastMessage.content + chunk;
            currentMessages[currentMessages.length - 1] = lastMessage;
            return currentMessages;
          });
        }
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setMessages((prev) => [...prev, { role: "assistant", content: "Error connecting to assistant. Ensure FastAPI backend is running on port 8000." }]);
    }
  };

  return (
    <>
<div className='side-rail right' data-od-id='rail-right'>
  <span className='rail-text'>Health AI — Vol. 01 · Issue Nº 01 · Apache-2.0</span>
</div>
<div className='side-rail left' data-od-id='rail-left'>
  <span className='rail-text'>Wellness · Diagnostics · Privacy · Local-first</span>
</div>
<div className='shell' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

<div className='topbar' data-od-id='topbar'>
  <div className='container topbar-inner'>
    <span><b>HEALTH / 2026</b> &nbsp;·&nbsp; Vol. 01 / Issue Nº 01</span>
    <span className='mid'>
      <span>Filed under <b className='coral'>Medicine · Intelligence</b></span>
      <span>Apache-2.0 · Local-first</span>
    </span>
    <span className='right'>
      <span className='pulse'></span>Online · v1.0.0
      <span><b>EN</b></span>
    </span>
  </div>
</div>

<header className='nav' data-od-id='nav'>
  <div className='container nav-inner'>
    <a href='#top' className='brand'>
      <img src='./assets/health_logo.png' alt='Health AI Logo' style={{width: '28px', height: '28px'}} />
      <span>Health AI</span>
      <span className='brand-meta'><b>Clinical Assistant</b>Local Environment</span>
    </a>
    <div className='nav-side'>
      <span className='nav-cta ghost' style={{cursor: 'default'}}>Secure Connection</span>
      <span className='status-dot' aria-hidden='true'></span>
    </div>
  </div>
</header>

<main style={{ flex: 1, padding: '40px 0', display: 'flex', flexDirection: 'column' }}>
  <div className='container' style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '1000px' }}>
    
    <div className='sec-rule'>
      <span className='roman'>I.</span>
      <span className='meta-grp'>
        <span>Diagnostic Interface / AI</span>
        <span className='dot-mark'>•</span>
        <span>Health Assistant</span>
      </span>
      <span>001 / 001</span>
    </div>

    <div className='chat-interface' style={{ 
      background: 'var(--bone)', 
      borderRadius: '24px', 
      padding: '40px', 
      boxShadow: 'var(--shadow)',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      marginTop: '20px',
      minHeight: '65vh'
    }}>
      <div className='messages' style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '12px' }}>
        {messages.length === 0 ? (
           <div style={{ margin: 'auto', textAlign: 'center' }}>
             <img src='./assets/health_logo.png' alt='' style={{width: '64px', height: '64px', marginBottom: '24px', opacity: 0.8}} />
             <h2 className='display' style={{ fontSize: '32px', marginBottom: '16px' }}>How can I assist with your <em>health</em> today<span className='dot'>.</span></h2>
             <p style={{fontFamily: 'var(--body)', color: 'var(--ink-mute)', maxWidth: '400px', margin: '0 auto'}}>
               Ask a medical question, request diagnostic insights, or discuss wellness strategies. All data is processed locally.
             </p>
           </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              background: m.role === 'user' ? 'var(--ink)' : 'var(--paper)',
              color: m.role === 'user' ? 'var(--paper)' : 'var(--ink)',
              padding: '16px 24px',
              borderRadius: '16px',
              maxWidth: '85%',
              fontFamily: 'var(--body)',
              fontSize: '15px',
              lineHeight: 1.6,
              border: m.role === 'assistant' ? '1px solid var(--line)' : 'none',
              whiteSpace: 'pre-wrap',
              boxShadow: m.role === 'assistant' ? '0 4px 12px rgba(0,0,0,0.03)' : 'none'
            }}>
              {m.content}
            </div>
          ))
        )}
        {loading && (
           <div style={{ alignSelf: 'flex-start', background: 'var(--paper)', padding: '16px 24px', borderRadius: '16px', border: '1px solid var(--line)', fontFamily: 'var(--sans)', color: 'var(--ink-mute)', display: 'flex', alignItems: 'center', gap: '12px' }}>
             <div className="typing-indicator">
               <span></span><span></span><span></span>
             </div>
             <span>Analyzing medical data...</span>
           </div>
        )}
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your symptoms, ask about medication, or request health advice..."
          style={{
            flex: 1,
            padding: '20px 28px',
            borderRadius: '999px',
            border: '1px solid var(--line)',
            background: 'var(--paper)',
            fontFamily: 'var(--sans)',
            fontSize: '16px',
            outline: 'none',
            color: 'var(--ink)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
          }}
        />
        <button type="submit" disabled={loading} style={{
          padding: '0 40px',
          borderRadius: '999px',
          background: 'var(--coral)',
          color: '#fff',
          border: 'none',
          fontFamily: 'var(--sans)',
          fontSize: '16px',
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
        }}>
          Send
        </button>
      </form>
    </div>
  </div>
</main>

<footer data-od-id='footer' style={{ marginTop: 'auto' }}>
  <div className='container'>
    <div className='foot-grid' style={{ gridTemplateColumns: '1fr', padding: '40px 0' }}>
      <div className='foot-brand' style={{ textAlign: 'center' }}>
        <a href='#top' className='brand' style={{ justifyContent: 'center' }}>
          <img src='./assets/health_logo.png' alt='' style={{width: '24px', height: '24px'}} />
          <span>Health AI</span>
        </a>
        <p style={{marginTop: "18px", margin: "18px auto 0", maxWidth: "600px", color: "var(--ink-mute)"}}>The open-source local medical intelligence platform. Expert-level diagnostic insights seamlessly backed by verified data and cutting-edge local AI architecture. Strict privacy protocols enforced.</p>
      </div>
    </div>
    <div className='foot-bottom'>
      <span><span className='pulse'></span>● <b style={{color: "var(--ink)"}}>Health AI</b> · Local Environment · 2026</span>
      <span className='right'>
        <span>Privacy-First</span>
        <span>Data strictly retained locally</span>
      </span>
    </div>
  </div>
</footer>
</div>
    </>
  );
}
