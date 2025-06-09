# Deployment Instructions for Lansing Tech Studio Website

## Prerequisites
- GitHub account
- Git installed on your computer
- GitHub Pages enabled for your repository

## Initial Setup

1. **Create GitHub Repository**
   - Go to [GitHub](https://github.com)
   - Create a new repository named `Lansing-Tech-Studio.github.io`
   - Make sure it's public (required for GitHub Pages free tier)

2. **Upload Site Files**
   - Clone this repository or upload all files to your GitHub repository
   - Ensure the main branch contains all the Jekyll files

## Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Click **Save**

## Automatic Deployment

The site includes a GitHub Actions workflow (`.github/workflows/jekyll.yml`) that will:
- Automatically build the site when you push changes
- Deploy to GitHub Pages
- Handle Jekyll dependencies and build process

## Manual Deployment (Alternative)

If you prefer manual deployment:

1. **Local Development**
   ```bash
   bundle install
   bundle exec jekyll serve
   ```

2. **Build for Production**
   ```bash
   bundle exec jekyll build
   ```

3. **Deploy**
   - Push changes to main branch
   - GitHub Pages will automatically deploy

## Site URL

Once deployed, your site will be available at:
`https://lansing-tech-studio.github.io`

## Customization

### Content Updates
- Update markdown files in the root directory
- Add blog posts to `_posts/` directory
- Modify `_config.yml` for site settings

### Images
- Replace placeholder images in `assets/images/` with actual photos
- Update image references in markdown files

### Contact Form
- Replace Formspree endpoint in `contact.md` with your actual form processor
- Set up form processing service (Formspree, Netlify Forms, etc.)

### Social Media
- Update social media links in `_layouts/default.html`
- Add actual social media URLs

## Troubleshooting

### Build Errors
- Check GitHub Actions tab for build logs
- Ensure all dependencies are properly listed in `Gemfile`
- Verify YAML front matter syntax in markdown files

### CSS/Styling Issues
- Check `assets/css/style.scss` for syntax errors
- Ensure Sass syntax is compatible with GitHub Pages Jekyll version

### Navigation Issues
- Verify navigation links in `_layouts/default.html`
- Check that page slugs match navigation URLs

## Maintenance

### Regular Updates
- Keep Jekyll dependencies updated
- Monitor GitHub Pages status
- Update content and images regularly
- Check for broken links periodically

### Security
- Keep dependencies updated
- Monitor for security advisories
- Use environment variables for sensitive data

## Support

For issues with:
- Jekyll: [Jekyll Documentation](https://jekyllrb.com/docs/)
- GitHub Pages: [GitHub Pages Documentation](https://docs.github.com/en/pages)
- GitHub Actions: [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Next Steps

1. Replace all placeholder content with actual information
2. Add real images and photos
3. Set up contact form processing
4. Configure Google Analytics (optional)
5. Set up custom domain (optional)
6. Add SEO optimization
7. Test on multiple devices and browsers
