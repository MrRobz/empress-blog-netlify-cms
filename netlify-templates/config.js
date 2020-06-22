module.exports = `
backend:
  name: git-gateway
  branch: master
media_folder: 'public/uploads'
public_folder: "/uploads"
collections:
  - name: 'blog'
    label: 'Blog'
    folder: 'content/'
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { name: "title", label: "Title", widget: "string" }
      - { name: "image", label: "Image", widget: "image", required: false }
      - name: "imageMeta"
        label: "ImageMeta"
        widget: "object"
        collapsed: true
        fields: 
          - { label: "attribution", name: "attribution", widget: "string", default: '', required: false }
          - { label: "attributionLink", name: "attributionLink", widget: "string", default: '', required: false }
      - { name: "featured", label: "Featured", widget: "boolean", default: true }
      - { name: "authors", label: "Authors", widget: "list", default: ["ghost"] }
      - { name: "tags", label: "Tags", widget: "list", default: ["new"], required: false }
      - { name: "body", label: "Body", widget: "markdown" }
      - { label: "Publish Date", name: "date", widget: "datetime", format: "ddd MMM DD YYYY h:mm:ss a"}

  - name: 'author'
    label: 'Author'
    folder: 'author/'
    create: true
    slug: "{{name}}"
    fields:
      - { name: "name", label: "Name", widget: "string" }
      - { name: "id", label: "Id", widget: "string" }
      - { name: "image", label: "Image", widget: "image", required: false }
      - { name: "cover", label: "Cover", widget: "string", required: false }
      - { name: "website", label: "Website", widget: "string", required: false }
      - { name: "twitter", label: "Twitter", widget: "string", required: false }
      - { name: "facebook", label: "Facebook", widget: "string", required: false }
      - { name: "location", label: "Location", widget: "string", required: false }
      - { name: "body", label: "Body", widget: "markdown", required: false }

  - name: 'tag'
    label: 'Tag'
    folder: 'tag/'
    create: true
    slug: "{{name}}"
    fields:
      - { name: "name", label: "Name", widget: "string" }
      - { name: "image", label: "Image", widget: "image", required: false }
      - { name: "body", label: "Body", widget: "markdown", required: false }
`;