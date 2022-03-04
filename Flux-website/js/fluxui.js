function beautifyValue(value, places = 2) {
  const fixedValue = value.toFixed(places)
  return fixedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
$.ajax({
  Method: 'GET',
  url: 'https://stats.runonflux.io/fluxinfo?projection=tier,benchmark',
  dataType: 'json',
  success: function(s) {
    const nodes = s.data
    let vcores = 0
    let ssd = 0
    let hdd = 0
    let ram = 0
    nodes.forEach(node => {
      if (node.tier === 'CUMULUS' && node.benchmark && node.benchmark.bench) {
        let bm = node.benchmark.bench
        vcores += bm.cores === 0 ? 2 : bm.cores
        ram += bm.ram < 4 ? 4 : Math.round(bm.ram)
        ssd += bm.ssd
        hdd += bm.hdd
      } else if (node.tier === 'CUMULUS') {
        vcores += 2
        ram += 4
        hdd += 50
      } else if (node.tier === 'NIMBUS' && node.benchmark && node.benchmark.bench) {
        let bm = node.benchmark.bench
        vcores += bm.cores === 0 ? 4 : bm.cores
        ram += bm.ram < 8 ? 8 : Math.round(bm.ram)
        ssd += bm.ssd
        hdd += bm.hdd
      } else if (node.tier === 'NIMBUS') {
        vcores += 4
        ram += 8
        ssd += 150
      } else if (node.tier === 'STRATUS' && node.benchmark && node.benchmark.bench) {
        let bm = node.benchmark.bench
        vcores += bm.cores === 0 ? 8 : bm.cores
        ram += bm.ram < 32 ? 32 : Math.round(bm.ram)
        ssd += bm.ssd
        hdd += bm.hdd
      } else if (node.tier === 'STRATUS') {
        vcores += 8
        ram += 32
        ssd += 600
      }
    })
    $('div.text_info.nodes').text(`${new Number(nodes.length).toLocaleString()}`)
    $('div.text_info.vcores').text(`${new Number(vcores).toLocaleString()}`)
    $('div.text_info.ssd').text(`${beautifyValue((ssd+hdd) / 1024, 2)}`)
    $('div.text_info.ram').text(`${beautifyValue(ram / 1024, 2)}`)
  }
});
particlesJS.load('particles-js',
'./js/particles.json', function(){
  console.log('particles.json loaded...')
});

$(document).ready(function () {
   $('a[href^="#"]').on('click', function (e) {
       e.preventDefault();

       var target = this.hash,
           $target = $(target);

       $('html, body').stop().animate({
           'scrollTop': $target.offset().top - 80
       }, 900, 'swing', function () {
           window.location.hash = target;
       });
   });
   $(window).on("scroll", function() {
    if($(window).scrollTop() > 50) {
        $(".header-nav").addClass("header-fix");
    } else {
       $(".header-nav").removeClass("header-fix");
    }
});

});



