---
title: "My mini Homelab"
summary: "Running a mini homelab and workstation on Linux Mint Cinnamon"
showToc: false
hideSummary: false
ShowReadingTime: true
tags: ["DIY"]
ShowWordCount: true
ShowRssButtonInSectionTermList: true
disableShare: false
ShowBreadCrumbs: true
hideMeta: false
searchHidden: true
---
![Kazi Hossain fastfetch showcase](/img/stat.png)

My simple homelab + workstation accessible from anywhere with hassle free maintenance. 

### Specs

| **Item**        | **Model**                                  |
|-----------------|--------------------------------------------|
| **CPU**         | Ryzen 5 5600X                              |
| **GPU**         | Radeon™ RX 6700 XT                         |
| **RAM**         | TEAMGROUP T-Force Delta RGB DDR4 16GB      |
| **Board**       | MSI B550                                   |
| **Cooler**      | Cooler Master rgb cpu cooler               |
| **SSD**         | Some nvme 500GB, Some ssd  500 GB          |
| **HDD**         | Western Digital 4TB WD Blue                |
| **Case**        | LIAN LI Case                               |

This build was initially not designed to function as a server. When I first built this station 3 to 4 years ago, the original purpose was for occasional gaming and editing. I rarely play any video games nowadays, but I still wanted to use the pc for periodical editing and local LLM training while loafing around. Over the years, I have tried many dedicated server and Hypervisor solutions such as [Proxmox](https://en.wikipedia.org/wiki/Proxmox_Virtual_Environment), [Ubuntu Server](https://ubuntu.com/download/server), [CentOS](https://www.centos.org/). My favorite was by far Proxmox, with the ability to spin up any VM within minutes. But being limited to a single GPU did not help! I then moved to the Ubuntu server, which, although it met all my needs, made setting up video editing software awfully difficult. This also makes my pc generally useless as I can only shh into it without any GUI. I wanted to stick to Debian (I love Arch, btw) due to its compatibility with most corporate endpoints and various other software. This led me to install good old [Linux Mint Cinnamon](https://linuxmint.com/) and to set that up as a server. This is the optimal setup for me right now, as I can run this as a server but also use the machine for LLM, editing, etc.

### Setup 
![Tailscale](/img/server.png)



### Tools
• [Immich](https://immich.app/) : Google Photos alternative \
• [Portainer](https://www.portainer.io/) : Better container management \
• [Pi-hole](https://pi-hole.net/) : I hate ADS \
• [Tailscale](https://tailscale.com/) : Homelab exit node vpn for my phone and uni laptop

In future I would love to setup more tools as I discover them. But for now this is all. 


Thanks.