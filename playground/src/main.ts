import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './style.css'
import ScrollMatter from '../../packages/core/src/index'

const element = document.getElementById('app')

const matter = new ScrollMatter(element)

matter.scrollArea()
