export type ManifestJson = {
  manifest_version: 2 | 3
  name: string
  version: string
  action: {
    default_icon?: string
    default_title?: string
    default_popup?: string
  }
  author?: string
  description?: string
  icons?: {
    16?: string
    48?: string
    128?: string
  }
  homepage_url?: string
  background?: {
    service_worker: string
  }
  content_scripts?: { js: string[]; css: string[]; matches: string[] }[]
  options_page?: string
}

export interface CommandOptions extends OptionValues {
  webpack?: boolean
  tailwindcss?: boolean
  icon?: string
}

export type Answers = {
  description: string
  version: string
  homepage: string
  popup: string
  background: boolean
  content_script: boolean
  options_page: boolean
}
