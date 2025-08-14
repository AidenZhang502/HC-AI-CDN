export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>HC-AI-CDN</h1>
      <p>Fitness Animation CDN Service</p>
      <ul>
        <li><a href="/api/exercises">Get Exercises API</a></li>
        <li><a href="/all_in_one_pack.zip">Download Animations</a></li>
        <li><a href="/manifest.json">Manifest</a></li>
      </ul>
    </div>
  )
}