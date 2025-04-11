// require dependencies
const express = require('express')
const helmet = require('helmet')

// create Express app
const app = express()
app.use(helmet())

// Server config
const port = process.env.PORT || 3000
const hostname = process.env.HOSTNAME || 'localhost'

// Home endpoint
app.get('/', (req, res) => {
  res.send(`
    <h1>🌍 Welcome to the Hope & Kindness API 🌈</h1>
    <p>Endpoints ที่ให้พลังใจ:</p>
    <ul>
      <li><a href="/quote">/quote</a> - คำคมให้แรงบันดาลใจ</li>
      <li><a href="/kindness">/kindness</a> - ข้อความแห่งความเมตตา</li>
      <li><a href="/cheerup?name=yourname">/cheerup?name=yourname</a> - ส่งกำลังใจถึงคุณ</li>
      <li><a href="/hug/:name">/hug/:name</a> - กอดเสมือน</li>
    </ul>
  `)
})

// คำคมสร้างแรงบันดาลใจแบบสุ่ม
const quotes = [
  "จงเป็นแสงสว่างให้กับตัวเองและผู้อื่น ✨",
  "อย่ายอมแพ้กับความฝันของคุณ เพราะคุณเกิดมาเพื่อทำให้มันเป็นจริง",
  "ทุกวันคือโอกาสใหม่ในการเริ่มต้นสิ่งดี ๆ",
  "แม้วันนี้จะเหนื่อย แต่พรุ่งนี้อาจเต็มไปด้วยรอยยิ้ม 😊",
  "สิ่งเล็ก ๆ ที่คุณทำ อาจยิ่งใหญ่สำหรับใครบางคน"
]

app.get('/quote', (req, res) => {
  res.send(`<h2>🌟 คำคมประจำวันนี้:</h2><p>${randomFrom(quotes)}</p>`)
})

// ข้อความแห่งความเมตตา
const kindness = [
  "คุณเป็นคนที่มีคุณค่า อย่าลืมนะ ❤️",
  "โลกนี้ต้องการคนแบบคุณ",
  "แม้คุณไม่รู้ แต่มีคนแอบยิ้มเพราะคุณอยู่แน่นอน",
  "การที่คุณพยายามมาถึงวันนี้...นั่นคือชัยชนะแล้ว",
  "คุณทำได้ดีกว่าที่คุณคิดเสมอ!"
]

app.get('/kindness', (req, res) => {
  res.send(`<h2>💖 ข้อความแห่งความเมตตา:</h2><p>${randomFrom(kindness)}</p>`)
})

// ส่งข้อความให้กำลังใจแบบเฉพาะบุคคล
app.get('/cheerup', (req, res) => {
  const name = req.query.name || 'เพื่อน'
  res.send(`<h2>🌞 ส่งพลังใจถึง ${name}!</h2><p>${randomFrom(quotes)}</p>`)
})

// ส่ง virtual hug
app.get('/hug/:name', (req, res) => {
  const name = req.params.name
  res.send(`<h1>🤗 Hug for ${name} 🤗</h1><p>ขอให้คุณอบอุ่นและมีวันที่ดีนะ!</p>`)
})

// Handle 404
app.use((req, res) => {
  res.status(404).send(`<h2>404</h2><p>เส้นทาง ${req.originalUrl} ไม่พบ</p>`)
})

// Start server
app.listen(port, hostname, () => {
  console.log(`✨ Hope & Kindness API running at http://${hostname}:${port}/ ✨`)
})

// Utility function
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
