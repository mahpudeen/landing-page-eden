const redirects = {
    '/about-us': '/tentang-kami',
    '/id/about-us': '/tentang-kami',
    '/our-products': '/produk-segar',
    '/id/our-products': '/produk-segar',
    '/customer': '/mitra',
    '/id/customer': '/mitra',
    '/supplier': '/mitra',
    '/id/supplier': '/mitra',
    '/rekan-eden': '/mitra',
    '/career': '/karir',
    '/id/career': '/karir',
    '/culinary-solution': '/blog',
    '/id/culinary-solution': '/blog',

    '/about-us/': '/tentang-kami/',
    '/id/about-us/': '/tentang-kami/',
    '/our-products/': '/produk-segar/',
    '/id/our-products/': '/produk-segar/',
    '/customer/': '/mitra/',
    '/id/customer/': '/mitra/',
    '/supplier/': '/mitra/',
    '/id/supplier/': '/mitra/',
    '/rekan-eden/': '/mitra/',
    '/career/': '/karir/',
    '/id/career/': '/karir/',
    '/culinary-solution/': '/blog/',
    '/id/culinary-solution/': '/blog/',
  }
  
  export default function ({ route, redirect }) {
    const redirectedPath = redirects[route.path]
    if (redirectedPath) {
      return redirect(redirectedPath)
    }
  }
  