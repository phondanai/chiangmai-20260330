# Docker Commands Workshop

## 🔰 Basic Commands

### 1. ตรวจสอบ Docker Version

```bash
docker version
docker info
```

### 2. ค้นหา Image (Search)

```bash
docker search nginx
docker search --filter is-official=true nginx
docker search --filter stars=50 nginx
```

### 3. ดึง Image (Pull)

```bash
# pull image จาก Docker Hub
docker pull nginx
docker pull nginx:alpine
docker pull nginx:1.27

# pull จาก registry อื่น
docker pull ghcr.io/nginx/nginx-prometheus-exporter:latest
```

### 4. ดู Image ที่มีอยู่

```bash
docker images
docker images -a
docker image ls
docker image ls --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
```

### 5. ลบ Image

```bash
docker rmi nginx
docker rmi nginx:alpine
docker image rm nginx:1.27

# ลบ image ที่ไม่ได้ใช้ทั้งหมด
docker image prune
docker image prune -a
```

### 6. รัน Container (Run)

```bash
# รัน container แบบ foreground
docker run nginx

# รัน container แล้ว attach terminal
docker run -it alpine sh

# รัน container แบบ background (detach)
docker run -d nginx

# รัน container ตั้งชื่อ
docker run -d --name web nginx

# รัน container กำหนด port
docker run -d --name web -p 8080:80 nginx

# รัน container แล้วลบอัตโนมัติเมื่อหยุด
docker run --rm -it alpine sh
```

### 7. ดู Container ที่กำลังรัน

```bash
docker ps
docker ps -a         # แสดงทั้งหมดรวมที่หยุดแล้ว
docker ps -q         # แสดงเฉพาะ ID
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### 8. หยุด / เริ่ม / รีสตาร์ท Container

```bash
docker stop web
docker start web
docker restart web

# หยุดทุก container
docker stop $(docker ps -q)
```

### 9. ลบ Container

```bash
docker rm web
docker rm -f web     # force ลบแม้ยังรันอยู่

# ลบทุก container ที่หยุดแล้ว
docker container prune
```

### 10. ดู Log

```bash
docker logs web
docker logs -f web         # follow realtime
docker logs --tail 50 web  # แสดง 50 บรรทัดล่าสุด
docker logs --since 1h web # แสดง log ใน 1 ชม.ล่าสุด
```

### 11. เข้าไปใน Container ที่รันอยู่

```bash
docker exec -it web sh
docker exec -it web bash
docker exec web ls -la /etc/nginx
```

### 12. ดูรายละเอียด Container

```bash
docker inspect web
docker inspect --format '{{.NetworkSettings.Ports}}' web
```

### 13. ดูการใช้ Resource

```bash
docker stats
docker stats web
docker top web
```

### 14. Copy ไฟล์ระหว่าง Host กับ Container

```bash
# host -> container
docker cp index.html web:/usr/share/nginx/html/

# container -> host
docker cp web:/etc/nginx/nginx.conf ./nginx.conf
```

---

## 🚀 Advanced Commands

### 15. จำกัด Resource

```bash
# จำกัด memory
docker run -d --name web --memory=256m nginx

# จำกัด CPU
docker run -d --name web --cpus=0.5 nginx

# จำกัดทั้ง memory + cpu
docker run -d --name web --memory=256m --cpus=1 nginx
```
# Monitor resource usage

```
docker stats web
```

### 16. Environment Variables

```bash
docker run -d --name myapp \
  -e APP_ENV=production \
  -e DB_HOST=db.example.com \
  nginx

docker run --rm -e CAT=meo nginx sh -c 'echo $CAT'

# ใช้ env file
docker run -d --name myapp --env-file .env nginx
```

### 17. Volume & Bind Mount

```bash
# bind mount — mount folder จาก host
docker run -d --name web \
  -v $(pwd)/html:/usr/share/nginx/html \
  -p 8080:80 nginx

# named volume
docker volume create mydata
docker run -d --name db \
  -v mydata:/var/lib/mysql \
  mysql:8

# ดู volume
docker volume ls
docker volume inspect mydata
docker volume rm mydata
docker volume prune
```

### 18. Network

```bash
# สร้าง network
docker network create mynet

# รัน container ใน network เดียวกัน
docker run -d --name web --network mynet nginx
docker run -d --name app --network mynet alpine sleep 3600

# ทดสอบ connect ระหว่าง container
docker exec app ping web

# ดู network
docker network ls
docker network inspect mynet

# ลบ network
docker network rm mynet
docker network prune
```

### 19. สร้าง Image จาก Container (Commit)

```bash
# แก้ไขอะไรบางอย่างใน container
docker run -it --name myalpine alpine sh
# > apk add curl
# > exit

# commit เป็น image ใหม่
docker commit myalpine myalpine-curl:v1
docker images | grep myalpine
```

### 20. Save / Load Image

```bash
# export image เป็น tar file
docker save -o nginx-alpine.tar nginx:alpine

# import image จาก tar file
docker load -i nginx-alpine.tar
```

### 21. Export / Import Container

```bash
# export container filesystem
docker export web -o web-export.tar

# import เป็น image ใหม่
docker import web-export.tar myimage:v1
```

### 22. Tag & Push Image

```bash
docker tag nginx:alpine myregistry.com/nginx:v1
docker push myregistry.com/nginx:v1
```

### 23. System Cleanup

```bash
# ดูพื้นที่ที่ Docker ใช้
docker system df
docker system df -v

# ลบทุกอย่างที่ไม่ได้ใช้ (image, container, volume, network)
docker system prune
docker system prune -a --volumes
```

### 24. Docker Build Context & History

```bash
# ดู history ของ image
docker history nginx:alpine
docker history --no-trunc nginx:alpine

# ดู build cache
docker builder prune
```

---

## 📦 Docker Registry

### 25. รัน Private Registry

```bash
# รัน registry server
docker run -d --name registry \
  -p 5000:5000 \
  --restart always \
  registry:2

# tag image สำหรับ push ไป local registry
docker tag nginx:alpine localhost:5000/nginx:alpine

# push ไป local registry
docker push localhost:5000/nginx:alpine

# pull จาก local registry
docker pull localhost:5000/nginx:alpine

# ดู catalog
curl http://localhost:5000/v2/_catalog
curl http://localhost:5000/v2/nginx/tags/list
```

### 26. Registry พร้อม Authentication (htpasswd)

```bash
mkdir -p auth

# สร้าง password file
docker run --rm --entrypoint htpasswd \
  httpd:2 -Bbn myuser mypassword > auth/htpasswd

# รัน registry พร้อม auth
docker run -d --name registry \
  -p 5000:5000 \
  -v $(pwd)/auth:/auth \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
  -e "REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd" \
  --restart always \
  registry:2

# login
docker login localhost:5000

# push
docker tag nginx:alpine localhost:5000/nginx:alpine
docker push localhost:5000/nginx:alpine
```

### 27. ใช้งาน Docker Hub

```bash
# login Docker Hub
docker login

# tag & push
docker tag myapp:v1 username/myapp:v1
docker push username/myapp:v1
```

### 28. ใช้งาน GitHub Container Registry (ghcr.io)

```bash
# login ด้วย Personal Access Token
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# tag & push
docker tag myapp:v1 ghcr.io/USERNAME/myapp:v1
docker push ghcr.io/USERNAME/myapp:v1
```

---

## 📝 Quick Reference

| คำสั่ง | รายละเอียด |
|--------|------------|
| `docker run` | สร้างและรัน container |
| `docker ps` | แสดง container ที่กำลังรัน |
| `docker stop` | หยุด container |
| `docker rm` | ลบ container |
| `docker images` | แสดง image ที่มี |
| `docker rmi` | ลบ image |
| `docker pull` | ดึง image จาก registry |
| `docker push` | push image ไป registry |
| `docker exec` | รันคำสั่งใน container |
| `docker logs` | ดู log ของ container |
| `docker volume` | จัดการ volume |
| `docker network` | จัดการ network |
| `docker system prune` | ลบสิ่งที่ไม่ใช้ |
