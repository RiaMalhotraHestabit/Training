# DAY 4 — SSL + mkcert + HTTPS

---

## Objective

Enable HTTPS locally using self-signed certificates, configure NGINX for SSL termination, and verify secure access via browser.

--- 

## Steps Performed

### 1. Install mkcert

Installed mkcert and required browser trust tools.

**Screenshot:** mkcert --version

![mkcert version](screenshots/mkcert-version.png)


### 2. Install Local CA

Installed local certificate authority for browser trust.

**Screenshot:**

sudo apt install libnss3-tools -y

![mkcert install](screenshots/mkcert-install-01.png)

mkcert -install success output

![mkcert install](screenshots/mkcert-install-02.png)


### 3. Generate SSL Certificates

Generated SSL certificates for localhost and myapp.local.

**Screenshot:** certificate generation output 

![ssl certificates](screenshots/cert-generation.png)

```bash
ls certs
```

![ssl certificates files list](screenshots/cert-ls.png)


### 4. Map Local Domain

Mapped myapp.local to 127.0.0.1 in hosts file.

```bash
/etc/hosts entry
```

### 5. Configure NGINX for HTTPS

Configured NGINX to:

Serve HTTPS on port 443

Redirect HTTP → HTTPS


### 6. Start NGINX via Docker

Started NGINX container using Docker Compose.

**Screenshot:** docker ps showing running container

![docker running](screenshots/container_running.png)
 

### 7. Verify HTTPS 

Accessed application securely via browser.

**Screenshot:** https://myapp.local with 🔒 lock icon.

![http to https redirect](screenshots/http-redirect.png)


### 8. Verify Redirect via Certificate

Confirmed HTTP redirects to HTTPS.

**Screenshot:** http://myapp.local redirecting to HTTPS

![https certificate details](screenshots/https-certificate-details.png)


---

## Outcome

HTTPS enabled successfully

Trusted local SSL certificates

HTTP traffic redirected to HTTPS

Secure connection verified

---
