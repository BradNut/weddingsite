# Wedding Website

## This is a skeleton template of the wedding website I created

Features include:
- Password login for site access
- RSVP page for groups or individuals
- Pages that include:
  - Home Page
  - Wedding Party
  - Photos pages
  - Q&A
  - Travel information
  - RSVP forms

## Detailed Info

Names, Dates, Locations are all hardcoded to a value

The site implements a basic auth with [next-iron-session](https://github.com/vvo/next-iron-session) to protect access without knowing the password to the site.

The code is set up to use a MongoDB instace, ENV MONGO_URL, but this could easily be swapped for any DB. For the purposes of deploying this template for viewing the data is hardcoded.

Use of CSS variables at a Layout level allows for theming and is easily extensible.

Adding, Updating, and Deleting of guests and groups is currently done manually on the DB or on a deployment of the admin specific branch.

This admin branch is not included yet in this example site as no roles or permissions have been set up. However, this branch does include  additional pages to add, edit, and delete these guests and groups.

*If deploying to production please remove all sections that have the following:*
```// TODO: REMOVE THIS WHEN TAKING YOUR SITE TO PRODUCTION```

## Tech

Overall a typical NextJS Application using ReactJS and basic authentication.

### Frontend

- ReactJS
- Styled Components
- Images
  - Loaded using either the default NextJS image with custom blur animation
  - Or loading using Cloudinary on NextJS image and custom blur

### Backend

- NextJS APIs
- Next Iron Session for Login
  - Server side rendering of base pages checking to see if user is logged in
  - Requires ENV variable of SECRET_COOKIE_PASSWORD to be set
- Mongoose DB for MongoDB
  - Used to store RSVPs and default logins

## Future Changes
1. On/Off feature for public vs password protected sites
2. Build in auth permissions to allow guest vs admin roles
3. If roles available then add in the admin pages for create, update, and deletion of guests/groups
4. Add more theming options and easy customization of pages, resources, etc.
5. Email reminder option