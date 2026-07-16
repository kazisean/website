+++
title = 'A New Calendar'
date = 2026-07-16T17:32:04-04:00
draft = true
description = ''
summary = ''
showToc = false
hideSummary = true
ShowReadingTime = true
topics = []  # put strings in quotes, e.g. ["tag1", "tag2"]
ShowWordCount = true
ShowRssButtonInSectionTermList = true
disableShare = false
ShowBreadCrumbs = true
hideMeta = false
keywords = []
+++

A new kind of calendar with atomic sub task given a time box. Fast, easy to edit and manage. obsidian like markdown notes, yearly + quaterly KPI trackers, mood etc. 

### System Architecture 
+ Clerk for auth
+ Convex for database + real time changes 
+ Cloudflare workers for backend
+ Expo + RN or Flutter (leaning towards flutter) for UI
+ Need to figure out encryption and data sharding later on post MVP launch

Document while building and writing down thoughts behind the reason.



Time Box for example : 

9 am to 10 : Leetcode 
ability to drag sub task 

Journal