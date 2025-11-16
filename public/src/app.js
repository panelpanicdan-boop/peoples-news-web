/* src/App.js
   People's News — Web (mock)
   Single-file demo for StackBlitz / local create-react-app
   NOTE: This is a mocked demo. All data stored in-memory; no backend.
*/
import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaUpload, FaUser, FaCog, FaCamera, FaBroadcastTower } from "react-icons/fa";

/* ---------- Mock data ---------- */
const MOCK_POSTS = [
  { id: "a1", user: "Alex", cat: "Event", text: "Street fair on Main — lots of people!", img: "https://placekitten.com/400/300", views: 120 },
  { id: "a2", user: "Maria", cat: "Accident", text: "Two-car collision on Rt. 10", img: "https://placebear.com/400/300", views: 500 },
  { id: "ad1", ad: true, brand: "Beep Boop", img: "https://placekitten.com/600/200", text: "Beep Boop — delivering joy to your door." },
  { id: "a3", user: "Jordan", cat: "Weather", text: "Hailstorm downtown!", img: "https://picsum.photos/seed/1/400/300", views: 78 },
  { id: "a4", user: "Sofia", cat: "Police", text: "Road closed near 5th Ave.", img: "https://picsum.photos/seed/2/400/300", views: 320 },
  { id: "ad2", ad: true, brand: "Beep Boop", img: "https://picsum.photos/seed/beep/600/200", text: "Beep Boop — local deals, big smiles." },
  { id: "a5", user: "Chris", cat: "Event", text: "Charity run today", img: "https://placekitten.com/401/300", views: 44 },
];

const outlineBtn = { padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", background: "transparent", cursor: "pointer" };

/* ---------- App ---------- */
export default function App() {
  const [tab, setTab] = useState("feed");
  const [feedMode, setFeedMode] = useState("interested");
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(() => ({
    id: "user_demo",
    name: "DemoUser",
    bio: "Local reporter. Coffee lover.",
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
    verified: false,
    balance: 12.5,
    uploads: ["a1","a3"],
    followers: 120,
    following: 58
  }));
  const [posts, setPosts] = useState(MOCK_POSTS.slice());
  const [usersLive, setUsersLive] = useState(42);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    document.body.style.background = darkMode ? "#07101a" : "#f2f4f7";
    document.body.style.color = darkMode ? "#e6eef8" : "#111";
  }, [darkMode]);

  useEffect(() => {
    const t = setInterval(()=> setUsersLive(v => Math.max(1, v + Math.floor(Math.random()*5-2))), 8000);
    return () => clearInterval(t);
  }, []);

  function handleGoLive(){
    const ageDays = (Date.now() - user.joinedAt) / (1000*60*60*24);
    if(!user.verified) return alert("Account must be verified to go live (mock).");
    if(ageDays < 7) return alert("Account must be >=7 days old to go live (mock).");
    setIsLive(true);
    setUsersLive(v=>v+1);
    alert("You are now live (mock).");
  }
  function stopLive(){ setIsLive(false); setUsersLive(v=>Math.max(0,v-1)); alert("Live ended (mock)"); }

  const feedItems = posts.filter((p,i)=> p.ad ? true : (feedMode === "following" ? i % 2 === 0 : true));

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, position: "sticky", top: 0, background: "rgba(255,255,255,0.6)", zIndex: 40 }}>
        <div style={{ fontWeight: 800 }}>People's News</div>
        <div style={{ fontSize: 13, color: "#0077cc" }}>{usersLive} current users live</div>
      </header>

      <main style={{ padding: 16, maxWidth: 980, margin: "0 auto" }}>
        {tab === "feed" && <Feed feedItems={feedItems} feedMode={feedMode} setFeedMode={setFeedMode} />}
        {tab === "upload" && <Upload posts={posts} setPosts={setPosts} />}
        {tab === "camera" && <Camera posts={posts} setPosts={setPosts} />}
        {tab === "live" && <LiveTab user={user} isLive={isLive} handleGoLive={handleGoLive} stopLive={stopLive} />}
        {tab === "account" && <Account user={user} posts={posts} setUser={setUser} />}
        {tab === "settings" && <SettingsTab darkMode={darkMode} setDarkMode={setDarkMode} user={user} setUser={setUser} isLive={isLive} handleGoLive={handleGoLive} stopLive={stopLive} />}
        <div style={{ height: 120 }}></div>
      </main>

      {/* bottom nav */}
      <nav style={{ position: "fixed", left: 12, right: 12, bottom: 16, height: 68, display: "flex", justifyContent: "space-around", alignItems: "center", background: "rgba(255,255,255,0.85)", borderRadius: 14, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}>
        <button onClick={()=>setTab("feed")} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center" }}><FaHome size={20}/><div style={{ fontSize: 11 }}>Feed</div></button>
        <button onClick={()=>setTab("upload")} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center" }}><FaUpload size={20}/><div style={{ fontSize: 11 }}>Upload</div></button>

        <div style={{ width: 66, height: 66, borderRadius: 999, marginTop: -36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={()=>setTab("live")}>
          <div style={{ width:56,height:56,borderRadius:999,background:"linear-gradient(135deg,#ff5f6d,#ffc371)",display:"flex",alignItems:"center",justifyContent:"center"}}><FaBroadcastTower color="#fff" /></div>
        </div>

        <button onClick={()=>setTab("camera")} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center" }}><FaCamera size={20}/><div style={{ fontSize: 11 }}>Camera</div></button>
        <button onClick={()=>setTab("account")} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center" }}><FaUser size={20}/><div style={{ fontSize: 11 }}>Account</div></button>
      </nav>

      {/* raised footer card */}
      <footer style={{ position: "fixed", left: 16, right: 16, bottom: 100, padding: 12, background: "rgba(255,255,255,0.95)", boxShadow: "0 12px 30px rgba(0,0,0,0.06)", borderRadius: 10, textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>People's News — Mock</div>
        <div style={{ fontSize: 12, color: "#666" }}>Beep Boop sponsor ad</div>
      </footer>
    </div>
  );
}

/* ---------- subcomponents (feed, post, ad, upload, camera, account, settings) ---------- */

function Feed({ feedItems, feedMode, setFeedMode }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <button style={{ ...outlineBtn, marginRight: 8, borderColor: feedMode === "following" ? "#007bff" : "rgba(0,0,0,0.12)" }} onClick={() => setFeedMode("following")}>Following</button>
          <button style={{ ...outlineBtn, borderColor: feedMode === "interested" ? "#007bff" : "rgba(0,0,0,0.12)" }} onClick={() => setFeedMode("interested")}>Interested</button>
        </div>
        <div style={{ fontSize: 13 }}>{feedItems.filter(f=>!f.ad).length} posts</div>
      </div>

      <div>
        {feedItems.map(p=> p.ad ? <AdCard key={p.id} ad={p} /> : <PostCard key={p.id} post={p}/>)}
      </div>
    </>
  );
}

function PostCard({ post }) {
  return (
    <article style={{ padding: 14, background: "#fff", borderRadius: 12, boxShadow: "0 6px 18px rgba(2,6,23,0.06)", marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div><div style={{ fontWeight:700 }}>{post.user}</div><div style={{ fontSize:12, color:"#666" }}>{post.cat}</div></div>
        <div style={{ textAlign: "right" }}><div style={{ fontWeight:700 }}>${Math.max(5, Math.round(post.views/10))}</div><div style={{ fontSize:11, color:"#666" }}>est payout</div></div>
      </div>
      <p style={{ marginTop: 8 }}>{post.text}</p>
      {post.img && <img src={post.img} alt="post" style={{ width: "100%", borderRadius: 8 }} />}
      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <button style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,.12)", background: "transparent"}}>View</button>
        <button style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,.12)", background: "transparent"}}>Share</button>
        <button style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,.12)", background: "transparent"}}>Report</button>
      </div>
    </article>
  );
}

function AdCard({ ad }) {
  return (
    <article style={{ padding: 14, background: "#fff", borderRadius: 12, boxShadow: "0 6px 18px rgba(2,6,23,0.06)", marginBottom: 12, border: "2px solid #f0c" }}>
      <div style={{ fontWeight:700 }}>{ad.brand} (Sponsored)</div>
      <p style={{ marginTop:8 }}>{ad.text}</p>
      {ad.img && <img src={ad.img} alt="ad" style={{ width: "100%", borderRadius: 8 }} />}
      <div style={{ marginTop: 8 }}><button style={{ ...outlineBtn }}>Learn More</button></div>
    </article>
  );
}

function Upload({ posts, setPosts }) {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  function handleFile(e){ const f = e.target.files[0]; if(!f) return; setFile({ url: URL.createObjectURL(f), type: f.type, name: f.name }); }
  function submit(){ const id = "p_"+Math.random().toString(36).slice(2,6); const newPost = { id, user:"You", cat:"Other", text: desc||"(no description)", img: file?.url, views:0 }; setPosts([newPost, ...posts]); setDesc(""); setFile(null); alert("Submitted to moderation (mock)"); }
  return (
    <section>
      <h2>Upload</h2>
      <div style={{ padding: 14, background: "#fff", borderRadius: 10 }}>
        <label style={{ fontWeight:700 }}>Description</label>
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} style={{ width:"100%", minHeight:80 }} />
        <div style={{ marginTop:8 }}>
          <input type="file" accept="image/*,video/*" onChange={handleFile} />
        </div>
        {file && <div style={{ marginTop:8 }}><img src={file.url} alt="preview" style={{ maxWidth:"100%" }} /></div>}
        <div style={{ marginTop:10 }}><button style={outlineBtn} onClick={submit}>Submit</button></div>
      </div>
    </section>
  );
}

function Camera({ posts, setPosts }) {
  const [file, setFile] = useState(null);
  function handleCapture(e){ const f = e.target.files[0]; if(!f) return; setFile({ url: URL.createObjectURL(f), type: f.type, name: f.name }); }
  function send(){ const id = "p_"+Math.random().toString(36).slice(2,6); const newPost = { id, user: "You", cat: "Other", text: "Camera upload", img: file?.url, views: 0 }; setPosts([newPost, ...posts]); setFile(null); alert("Camera upload submitted (mock)"); }
  return (
    <section>
      <h2>Camera</h2>
      <div style={{ padding:14, background:"#fff", borderRadius:10 }}>
        <input type="file" accept="image/*,video/*" capture="environment" onChange={handleCapture} />
        {file && (file.type?.startsWith("video") ? <video src={file.url} controls style={{ width:"100%" }} /> : <img src={file.url} alt="cap" style={{ width:"100%" }} />)}
        <div style={{ marginTop:10 }}><button style={outlineBtn} onClick={send}>Send</button></div>
      </div>
    </section>
  );
}

function Account({ user, posts, setUser }) {
  const userPosts = posts.filter(p => p.user === "You" || (user.uploads && user.uploads.includes(p.id)));
  return (
    <section>
      <div style={{ display:"flex", gap:16, padding:12, background:"#fff", borderRadius:10 }}>
        <div style={{ width:86, height:86, borderRadius:999, background:"#ddd" }} />
        <div>
          <div style={{ fontWeight:800, fontSize:18 }}>{user.name}</div>
          <div style={{ color:"#666" }}>{user.bio}</div>
          <div style={{ marginTop:10, display:"flex", gap:8 }}>
            <button style={{ padding:"6px 8px", borderRadius:8, border:"1px solid rgba(0,0,0,0.12)" }}>{user.followers} Followers</button>
            <button style={{ padding:"6px 8px", borderRadius:8, border:"1px solid rgba(0,0,0,0.12)" }}>{user.following} Following</button>
            <button style={{ padding:"6px 8px", borderRadius:8, border:"1px solid rgba(0,0,0,0.12)" }}>Messages</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop:18 }}>
        <h3>Your uploads</h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
          {userPosts.length === 0 && <div style={{ padding:12, background:"#fff", borderRadius:8 }}>No uploads yet.</div>}
          {userPosts.map(p=> <div key={p.id} style={{ background:"#f7f7f7", borderRadius:8, overflow:"hidden" }}>{p.img ? <img src={p.img} alt="u" style={{ width:"100%" }} /> : <div style={{ padding:20, textAlign:"center" }}>No media</div>}</div>)}
        </div>
      </div>
    </section>
  );
}

function SettingsTab({ darkMode, setDarkMode, user, setUser, isLive, handleGoLive, stopLive }) {
  const [isMonetized, setIsMonetized] = useState(false);
  const stats = { earnings: 152.75, views: 12840, uploads: 42 };

  function verifyIdentity(){ setUser({...user, verified:true}); alert("Identity verified (mock)"); }
  function verifyAddress(){ alert("Address verified (mock)"); }

  return (
    <section>
      <h2>Settings</h2>
      <div style={{ padding:14, background:"#fff", borderRadius:10, marginBottom:12 }}>
        <h3>Monetization</h3>
        {!isMonetized ? <button style={outlineBtn} onClick={()=>setIsMonetized(true)}>Apply for Monetization</button> :
         <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
           <button style={outlineBtn} onClick={verifyIdentity}>Verify Identity</button>
           <button style={outlineBtn} onClick={verifyAddress}>Verify Address</button>
           <button style={outlineBtn}>Lifetime Earnings: ${stats.earnings}</button>
           <button style={outlineBtn}>Total Views: {stats.views.toLocaleString()}</button>
           <button style={outlineBtn}>Total Uploads: {stats.uploads}</button>
         </div>}
      </div>

      <div style={{ padding:14, background:"#fff", borderRadius:10, marginBottom:12 }}>
        <h3>Appearance</h3>
        <button style={outlineBtn} onClick={()=>setDarkMode(!darkMode)}>Switch to {darkMode ? "Light" : "Dark"} Mode</button>
      </div>

      <div style={{ padding:14, background:"#fff", borderRadius:10 }}>
        <h3>Live</h3>
        {!isLive ? <button style={outlineBtn} onClick={handleGoLive}>Go Live (mock)</button> : <button style={outlineBtn} onClick={stopLive}>End Live</button>}
      </div>
    </section>
  );
}
