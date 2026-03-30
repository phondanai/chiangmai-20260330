# Dockerfile Workshop — Step by Step

แต่ละขั้นตอนจะอยู่ใน Dockerfile แยกไฟล์ เพื่อให้ build ทีละไฟล์ด้วย `-f` ได้

## วิธี Build

```bash
cd 02-dockerfile

# build ระบุ Dockerfile ด้วย -f
docker build -f Dockerfile.from01 -t workshop-from01 .

# รัน
docker run --rm workshop-from01
```

---

## สารบัญ

| ไฟล์ | คำสั่งที่เรียนรู้ | รายละเอียด |
|------|-----------------|-----------|
| Dockerfile.from01 | `FROM` | เลือก base image |
| Dockerfile.from02 | `FROM` (scratch) | สร้างจาก image เปล่า |
| Dockerfile.run01 | `RUN` | รันคำสั่งระหว่าง build |
| Dockerfile.run02 | `RUN` | chain คำสั่ง & ลด layer |
| Dockerfile.cmd01 | `CMD` | กำหนดคำสั่ง default |
| Dockerfile.cmd02 | `CMD` vs `ENTRYPOINT` | ความแตกต่าง |
| Dockerfile.entrypoint01 | `ENTRYPOINT` | กำหนด entrypoint |
| Dockerfile.copy01 | `COPY` | copy ไฟล์เข้า image |
| Dockerfile.add01 | `ADD` | add ไฟล์ + แตก tar |
| Dockerfile.workdir01 | `WORKDIR` | กำหนด working directory |
| Dockerfile.env01 | `ENV` | ตั้ง environment variable |
| Dockerfile.arg01 | `ARG` | build-time variable |
| Dockerfile.expose01 | `EXPOSE` | ประกาศ port |
| Dockerfile.volume01 | `VOLUME` | ประกาศ volume |
| Dockerfile.user01 | `USER` | กำหนด user |
| Dockerfile.label01 | `LABEL` | เพิ่ม metadata |
| Dockerfile.healthcheck01 | `HEALTHCHECK` | ตรวจสุขภาพ container |
| Dockerfile.multi01 | Multi-stage | basic multi-stage |
| Dockerfile.multi02 | Multi-stage Go | เทียบขนาด image |
| Dockerfile.multi03 | Multi-stage Node | เทียบขนาด image |

---

## 🧪 ทดลอง Build ทุกไฟล์

```bash
# build ทุก Dockerfile ทีเดียว
for f in Dockerfile.*; do
  name=$(echo $f | sed 's/Dockerfile\./workshop-/')
  echo "=== Building $f -> $name ==="
  docker build -f "$f" -t "$name" .
done
```
