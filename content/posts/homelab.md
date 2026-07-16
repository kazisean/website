---
title: "How losing a 120k-subscriber YouTube channel led me to self-host everything"
description: "Kazi Hossain's homelab and workstation running Linux, accessible from anywhere with hassle-free maintenance"
summary: "Running a mini homelab and workstation on Linux"
showToc: false
hideSummary: true
ShowReadingTime: true
topics: ["DIY"]
ShowWordCount: true
ShowRssButtonInSectionTermList: true
disableShare: false
ShowBreadCrumbs: true
hideMeta: false
---
![Kazi Hossain fastfetch showcase](/img/stat.png)

My simple homelab + workstation accessible from anywhere with hassle-free maintenance. 

### Specs

| **Item**        | **Model**                                  |
|-----------------|--------------------------------------------|
| **CPU**         | Ryzen 5 5600X                              |
| **GPU**         | Radeon™ RX 6700 XT                         |
| **RAM**         | TEAMGROUP T-Force  DDR4 16GB               |
| **Board**       | MSI B550                                   |
| **Cooler**      | Cooler Master rgb cpu cooler               |
| **SSD**         | Some nvme 500GB, Some ssd  500 GB          |
| **HDD**         | Western Digital 4TB WD Blue                |
| **Case**        | LIAN LI Case                               |

It's funny how this project even got started. I have recently lost access to one of my YouTube channel with over 120k subscribers and over 50 million total views. I created this channel during middle school and uploaded faceless niche videos on and off. I went AFK for a year or so during high school, came back, and am now stuck in a Google login deadlock. Every time I would input my password, Google would send me an SMS to my phone number as a 2-step verification, I would put that number and then it would say it sent a code to the same email I am trying to log in to. How am I supposed to get the code from the account I am trying to log into? I went back and forth with YouTube representatives about this bug, but the responses felt like they were mostly from bots. Anyway, they couldn't do anything, and now the account is just stuck in a deadlock. This made me realize how fragile the whole "cloud" is. Sure, I could've taken better precautions by maybe adding a recovery email too. But there is no such thing as the "cloud" or "serverless", it's just someone else's server. 

This led me down a rabbit hole into de-googling and overall caring a lot more about open-source software and self-hosting. But be warned once you take a step forward down this route... there is no going back. I moved away from Windows and started my Linux journey. The first few years were rough, as every time things would break, I would just re-image the machine. This made me pretty frugal about what kind of information I save on my computers. Most of my stuff was both locally backed up and on the cloud. So if I drop my computer or something crazy happens tomorrow, I could pick my work right back up from where I left off. I barely save anything in my computer now... maybe I will get into this in another blog post.


This server build was initially not designed to function as a server. When I first built this PC 3 to 4 years ago, the original purpose was for occasional gaming and editing. I rarely play any video games nowadays, but I still wanted to use the PC for periodic editing and local LLM training while loafing around. Over the years, I have tried many dedicated server and hypervisor solutions such as [Proxmox](https://en.wikipedia.org/wiki/Proxmox_Virtual_Environment), [Ubuntu Server](https://ubuntu.com/download/server), [CentOS](https://www.centos.org/). My favorite was by far Proxmox, with the ability to spin up any VM within minutes. But being limited to a single GPU did not help! I then moved to the Ubuntu server route, which, although it met all my needs, made setting up video editing software awfully difficult. This also makes my PC generally useless as I can only SSH into it without any GUI. I wanted to stick to Debian (I love Arch, btw) due to its stability and compatibility with most corporate endpoints and various other software. This led me to install good old [Linux Mint Cinnamon](https://linuxmint.com/) and to set that up as a server. This is the optimal setup for me right now, as I can run this as a server but also use the machine for LLM, editing, etc.

### System Architecture 
![Tailscale](/img/server.png)



### Current Tools
• [Immich](https://immich.app/) : Google Photos alternative \
• [NextCloud](https://nextcloud.com/) : Open Source google drive alternative \
• [Portainer](https://www.portainer.io/) : Better container management \
• [Pi-hole](https://pi-hole.net/) : I hate ADS \
• [Tailscale](https://tailscale.com/) : Homelab exit node vpn for my phone and uni laptop \ 
• [UpTime Kuma](https://uptimekuma.co/) : Fancy simple server uptime + monitoring \
• [JellyFin](https://jellyfin.org/) : Self-hosted media server \ 
• [Dispatcharr](https://github.com/dispatcharr/dispatcharr) : Personal 4k live tv management system \
• [Home Assistant](https://www.home-assistant.io/) : Smart home stuff 


### $0 tech stack for side projects
• [SigNoz](https://signoz.io/) : Data dog alternative running with cloudflare tunnel \ 
• [Umami](https://umami.is/) : Web analytics with cloudflare tunnel \ 
• [Twenty](https://twenty.com/) : Local CRM \

In the future I would love to set up more tools as I discover them. But for now this is all. 


Thanks.