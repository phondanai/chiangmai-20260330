# Docker Compose Workshop — Step by Step

แต่ละขั้นตอนจะอยู่ในไฟล์แยก เพื่อให้รันทีละ step ด้วย `-f`

## วิธีใช้

```bash
cd 03-compose

# รันด้วย compose file ที่ระบุ
docker compose -f compose.01-basic.yml up

# รัน background
docker compose -f compose.01-basic.yml up -d

# หยุด
docker compose -f compose.01-basic.yml down

# หยุดพร้อมลบ volume
docker compose -f compose.01-basic.yml down -v
```

---

## สารบัญ

| ไฟล์ | รายละเอียด |
|------|-----------|
| compose.01-basic.yml | เริ่มต้น — รัน service เดียว |
| compose.02-ports.yml | กำหนด port mapping |
| compose.03-env.yml | ใช้ environment variables |
| compose.04-volume.yml | ใช้ volume & bind mount |
| compose.05-network.yml | กำหนด network เชื่อมต่อ service |
| compose.06-multi.yml | รันหลาย service (web + db) |
| compose.07-depends.yml | depends_on & healthcheck |
| compose.08-build.yml | build image จาก Dockerfile |
| compose.09-full.yml | ตัวอย่างเต็ม (web + api + db + redis) |

---

## คำสั่ง Docker Compose ที่ใช้บ่อย

```bash
docker compose up              # สร้าง & รัน
docker compose up -d           # รัน background
docker compose up --build      # build image ใหม่แล้วรัน
docker compose down            # หยุด & ลบ container
docker compose down -v         # หยุด & ลบ container + volume
docker compose ps              # แสดง container ที่รัน
docker compose logs            # ดู log
docker compose logs -f api     # follow log เฉพาะ service
docker compose exec api sh     # เข้าไปใน container
docker compose build           # build image อย่างเดียว
docker compose pull            # pull image ใหม่
docker compose restart         # restart ทุก service
docker compose stop            # หยุดแต่ไม่ลบ container
docker compose start           # start container ที่หยุดไว้
```
