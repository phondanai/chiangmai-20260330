# 🐳 Docker Workshop — Chiang Mai 2026-03-30

## โครงสร้าง Workshop

```
├── 01-docker-commands/    # Docker CLI commands
│   └── README.md          # Basic, Advanced, Registry
│
├── 02-dockerfile/         # Dockerfile step-by-step
│   ├── README.md
│   ├── Dockerfile.from01      # FROM
│   ├── Dockerfile.from02      # FROM scratch
│   ├── Dockerfile.run01       # RUN (หลาย layers)
│   ├── Dockerfile.run02       # RUN (chain & best practice)
│   ├── Dockerfile.cmd01       # CMD
│   ├── Dockerfile.cmd02       # CMD vs ENTRYPOINT
│   ├── Dockerfile.entrypoint01 # ENTRYPOINT
│   ├── Dockerfile.copy01      # COPY
│   ├── Dockerfile.add01       # ADD (tar auto extract)
│   ├── Dockerfile.workdir01   # WORKDIR
│   ├── Dockerfile.env01       # ENV
│   ├── Dockerfile.arg01       # ARG
│   ├── Dockerfile.expose01    # EXPOSE
│   ├── Dockerfile.volume01    # VOLUME
│   ├── Dockerfile.user01      # USER
│   ├── Dockerfile.label01     # LABEL
│   ├── Dockerfile.healthcheck01 # HEALTHCHECK
│   ├── Dockerfile.multi01     # Multi-stage basic
│   ├── Dockerfile.multi02     # Multi-stage Go (vs single)
│   ├── Dockerfile.multi02-single
│   ├── Dockerfile.multi03     # Multi-stage Node (vs single)
│   ├── Dockerfile.multi03-single
│   ├── app-go/                # Go source code
│   └── app-node/              # Node.js source code
│
└── 03-compose/            # Docker Compose step-by-step
    ├── README.md
    ├── compose.01-basic.yml       # service เดียว
    ├── compose.02-ports.yml       # port mapping
    ├── compose.03-env.yml         # environment variables
    ├── compose.04-volume.yml      # volumes & bind mount
    ├── compose.05-network.yml     # network แยก frontend/backend
    ├── compose.06-multi.yml       # หลาย services
    ├── compose.07-depends.yml     # depends_on & healthcheck
    ├── compose.08-build.yml       # build จาก Dockerfile
    └── compose.09-full.yml        # ตัวอย่างเต็ม (web+api+db+redis)
```

---

## ลำดับการเรียนรู้

### Part 1: Docker Commands
1. เปิด [01-docker-commands/README.md](01-docker-commands/README.md)
2. ทดลองทีละคำสั่งตามลำดับ

### Part 2: Dockerfile
1. เปิด [02-dockerfile/README.md](02-dockerfile/README.md)
2. Build ทีละ Dockerfile:
   ```bash
   cd 02-dockerfile
   docker build -f Dockerfile.from01 -t workshop-from01 .
   docker run --rm workshop-from01
   ```
3. เรียนรู้ Multi-stage build → เปรียบเทียบขนาด image:
   ```bash
   docker build -f Dockerfile.multi02-single -t workshop-go-single .
   docker build -f Dockerfile.multi02 -t workshop-go-multi .
   docker images | grep workshop-go
   ```

### Part 3: Docker Compose
1. เปิด [03-compose/README.md](03-compose/README.md)
2. รันทีละ step:
   ```bash
   cd 03-compose
   docker compose -f compose.01-basic.yml up -d
   docker compose -f compose.01-basic.yml down
   ```
3. ไปจนถึง compose.09-full.yml ที่รวมทุกอย่าง

---

## Prerequisites

- Docker Desktop หรือ Docker Engine
- Docker Compose v2
- Terminal / Command Line

```bash
# ตรวจสอบ
docker version
docker compose version
```
