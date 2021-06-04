# Wedding Website

## This is a skeleton template of the wedding website I created

## Names, Dates, Locations are all hardcoded to a value

The site implements a basic auth to protect access without knowing the password to the site.

## Tech

Overall a typical NextJS Application

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
- Mongoose DB for MongoDB
  - Used to store RSVPs and default login
