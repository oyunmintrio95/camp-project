# CampenJoy Proposal
## Camping Community Website
---
## Table of Contents
1. [ Problem Description ](#problem-description)
2. [ Technical Solution ](#technical-solution)
3. [ Glossary ](#glossary)
4. [ High-Level Requirement ](#high-level-requirement)
5. [ User Stories/ Scenario](#user-stories)
---

<a name="problem-description"></a>
## 1. Problem Description
> Camping is one of the outdoor recreation. It can be done by individuals or groups of people. Camping includes lots of manual work, from building a tent to cooking. It’s about spending a night getting out of your comfort zone(your home) but staying in the woods. It’s a chance to get in touch with nature and get away from it.
>
> However, every campsite provides different facilities. It’s not an easy job to compare several candidates on sites. Finding campsites in certain areas and clicking websites for every site is difficult. Also, people's experience of the place can be completely different from what it’s described on its website.
>
> Another difficulty regarding camping is finding other campers who would camp together. For safety, knowing who will show up, how many people will go, and when they will get together for camping is essential.

<a name="technical-solution"></a>
## 2.Technical Solution
>Create an application for saving favorite campsites from a map and leave their own experience. Also, Make a forum where people can hold group camping.
>
> ### Scenario 1
> Lauren is considering taking a short camping trip for 3 days in California. She wants to reconnect with nature as much as possible. When deciding on the campsite, she wants one with good reviews and clean restrooms. She uses the campsite community application to read all the reviews from campers who have already visited there. She can get more trustworthy information about the campsite.
>
> ### Scenario 2
> Amanda wants to go camping. However, she has no one who would like to join her in her hobby. She doesn’t want to go by herself. She uses the campsite community application to find out if there’s some group camping coming up or if she should find people who would go with her. She decided to join a group camping around her place, and now she gets a chance to meet new people.

<a name="glossary"></a>
## 3. Glossary
> ### Camping Community
> It's a community based on a shared love of camping. The community has members who are campers. They host group campings. 
> ### Member
> A camper who joined the community website. Because of the security and trustworthiness reasons, only members who signed up for the website can leave reviews and hold camping meetings.
> ### Community Admin
> A camping community member with an administrator role. They have more rights compared to users. They take charge of allowing group camping events.
> A running club member with an administrator role. They have more privileges in the Group Run application. All admins are members, but not all members are admins.
> ### Camping meeting/ Group camping
> A camping event with a specific time and date.

<a name="high-level-requirement"></a>
## 4. High-Level Requirement
> For landing:
> - Browse campsites(anyone).
> - search with map api(anyone). 
> - save favorite campistes(MEMBER, ADMIN)
>
> For user account:
> - Sign up for user(anyone).
> - Login/logout(MEMBER, ADMIN).
> - edit user account (MEMBER, ADMIN).
> - delete user account(MEMBER,ADMIN). 
>
> For campsite review:
> - view reviews/experiences for each campsite(anyone)
> - post reviews/experience for each campsite(MEMBER, ADMIN)
> - edit reviews/experience(MEMBER, ADMIN)
> - delete reviews/experience(MEMBER, ADMIN)
>
> For finding companion campers or group camping meeting events:
> - view posts for each campsite(anyone)
> - post posts for each campsite(MEMBER, ADMIN)
> - edit post(MEMBER, ADMIN)
> - delete post(ADMIN)
> - //(STRETCH)People can leave reviews about companion campers to authenticate other campers.
>
> (STRETCH) For buying, selling, or exchanging second-hand camping equipment:
> - view posts for each campsite(anyone)
> - post posts for each campsite(USER, ADMIN)
> - edit post(USER, ADMIN)
> - delete post(ADMIN)

<a name="User Stories"></a>
## 5. User Stories.Scenarios
> ### Comparing Campsite Function
> ---
> ### Browse campsite
> Browse and search campsites around the wanted place.
>
> Suggeted data:
> - campiste API
> - https://developer.active.com/docs/read/Campground_APIs#:~:text=The%20Campground%20APIs%2C%20backed%20by%20Reserve%20America's,US%20and%20Canada's%20national%20and%20state/provincial%20parks.
>   
> **Precondition**: None
> 
> **Post-condition**: None
>
> ### Save favorite campsites
> Once a camper finds a campsite they're interested in, they can save it for their favorite list.
>
> Suggested data:
> - a location(foreign key of campsite)
>
> **Precondition**: To use this service, the User must be logged in with the MEMBER or ADMIN role.
> 
> **Post-condition**: The favorites will immediately saved to USER's favorites. 
>
> ### Reviews function
> ---
> ### Create Reviews
> For each campsite, campers can post their experience as text and can upload images.
>
> Suggested data:
> - a location(foreign key of campsite)
> - member(author of the post)
> - title
> - content
> - image(need another table since they can have several list)
> - post date
> - edit date
>
> **Precondition**: To use this service, the User must be logged in with the MEMBER or ADMIN role.
> 
> **Post-condition**: Both USER's and ADMIN's posts will uploaded immediately. For ADMIN's post, it will have an official mark.
>
> ### Browse Reviews
> All the users can read reviews.
>
> **Precondition**: None
> 
> **Post-condition**: None
>
> ### Edit Reviews
> Only the user who created the post can edit the review.
>
> **Precondition**: The User who created the post must be logged in to edit its post. ADMIN can update their post, but they don't have the right to update user's post.
> 
> **Post-condition**: Updated posts will be uploaded immediately.
>
> ### Delete Reviews
> Only Users and Admins can delete reviews.
>
> **Precondition**: The User who created the post must be logged in to delete its post. ADMINs have the right to delete all the posts. 
> 
> **Post-condition**: None.
>
> ### Find Companion Campers function
> ---
> ### Create a post to find other campers
> Campers post their meeting.
>
> Suggested data:
> - a location(foreign key of campsite)
> - member(a camper who is starting the meeting)
> - title
> - content
> - number of people
> - camp date
> - post date
> - edit date
> - reply (where people can reply to the post)
>
> **Precondition**: To use this service, the User must be logged in with the MEMBER or ADMIN role. Can only create for future camping.
> 
> **Post-condition**: The camp meeting is not automatically posted if the user is a MEMBER. It must be approved by an ADMIN. If the user is ADMIN, they can choose to post it immediately or keep it in a pending status. It will be marked as open; if it is posted before that, it will be marked as pending.
>
> ### Browse finding camping companions posts.
> Only members of the application can browse.
>
> **Precondition**: Users must be logged in as either USER or ADMIN. The posts that are opened and closed will be shown. 
> 
> **Post-condition**: None
>
> ### Edit camping meeting.
> Can only edit a camping in the future.
>
> **Precondition**: The User who created the post must be logged in to edit its post. The camping date must be in the future.
> 
> **Post-condition**: The camp meeting is not automatically posted if the user is a MEMBER. An ADMIN must approve it. If the user is ADMIN, they can choose to post it immediately or keep it in a pending status. It will be marked as open; if posted before that, it will be marked as pending.
>
> ### Delete Reviews
> Can only delete future camping.
>
> **Precondition**: The user must be logged in with the ADMIN role. The camping date must be in the future.
> 
> **Post-condition**: Data will not be deleted from the database. The status of the post will be marked as canceled and will not be shown in the UI. But it will be visible to the admin.
