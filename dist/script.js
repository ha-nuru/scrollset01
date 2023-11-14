// document.addEventListener('DOMContentLoaded', () => {
//   const sections = document.querySelectorAll('.sections');
//   sections.forEach((section) => {
//     section.activate = function() {
//       this.querySelector('.top-bar').classList.add('active');
//     }
//     section.deactivate = function() {
//       this.querySelector('.top-bar').classList.remove('active');
//     }
//   });
// window.addEventListener('scroll', () => {
//   var scrolledAmount = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
//   var supportsAnimationFrame = (window.requestAnimationFrame.constructor == Function);
//   if (supportsAnimationFrame) {
//    window.requestAnimationFrame(() => {
//        sections.forEach((section) => {
//         var topAt = section.offsetTop;
//         if (scrolledAmount >= topAt) {
//           section.activate()
//         } else {
//           section.deactivate()
//         }
//       });
//     }) 
//   } else {
//     setTimeout(() => {
//       sections.forEach((section) => {
//         var topAt = section.offsetTop;
//         if (scrolledAmount >= topAt) {
//           section.activate()
//         } else {
//           section.deactivate()
//         }
//       });
//     }, 500)
//   }
// });  
// });

var SectionMarker = {}

SectionMarker.enable = function(query) {
    this.sections = document.querySelectorAll(query);
    this.sections.forEach((section) => {
      section.activate = function() {
        this.querySelector('.top-bar').classList.add('active');
      }
      section.deactivate = function() {
        this.querySelector('.top-bar').classList.remove('active');
      }
    });
}

SectionMarker.update = function() {
    var scrolledAmount = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.sections.forEach((section) => {
        var topAt = section.offsetTop;
        if (scrolledAmount >= topAt) {
          section.activate()
        } else {
          section.deactivate()
        }
      });
}

SectionMarker.bindEvents = function() {
    var functionToBind = null,
        updateFunction = this.update.bind(this);
    if (this.supportsAnimationFrame) {
      functionToBind = window.requestAnimationFrame.bind(window, updateFunction);
    } else {
      functionToBind = setTimeout.bind(window, updateFunction, 500);
    }
    window.addEventListener('scroll', functionToBind);
}

SectionMarker.init = function(query) {
    this.supportsAnimationFrame = (window.requestAnimationFrame.constructor == Function);
    this.enable(query);
    this.bindEvents();
}

document.addEventListener('DOMContentLoaded', () => {
    window.sections = Object.create(SectionMarker);
    window.sections.init('.sections');
});