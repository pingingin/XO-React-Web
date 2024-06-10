## XO-React-Web

Web Game Tic Tac Toe 

Create By React

โดยตัวเกมสามารถเล่นได้ในโหมดผู้เล่นสองคน (2 player) และโหมดเล่นกับบอท (Player Vs Bot)
<br>และมีประวัติการเล่นสำหรับดูย้อนหลัง 5 เกม (เก็บข้อมูลประวัติการเดินในแต่ละเกมใน Local storage)

ในส่วนของ Algorithm
- วิธีการที่ใช้สำหรับเช็คหาผู้ชนะคือ ในแต่ละตาเดินจะทำการเช็คจำนวนของตัวอักษรที่ลงว่ามีครบในแถวในคอลัมน์หรือในแนวทแยงหรือไม่
  ถ้ามีก็จะมีผู้ชนะ ถ้าไม่มีจะทำการเล่นต่อ และถ้าตารางเต็มผลจะเป็นเสมอ
- วิธีการที่ใช้สำหรับบอทในการเล่นคือการสุ่มเลขข้อมูลของช่องที่ว่างอยู่ในตารางในแต่ละตาเดินของบอท

<hr>

In the project directory, you can run:

1. Install the package by running the command
```
npm i
```
2. Run project
```
npm run dev
```
3. Open <http://localhost:5173/>

<hr>

หรือสามารถเข้าไปทดลองเล่นได้ที่ <https://pingingin.github.io/XO-React-Web/>
