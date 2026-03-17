document.addEventListener('DOMContentLoaded',()=>{

let cart=[];
const cartItemsEl=document.getElementById('cartItems');
const cartTotalEl=document.getElementById('cartTotal');
const cartCountEl=document.getElementById('cartCount');

function updateCartUI(){
  cartItemsEl.innerHTML='';
  let total=0;
  cart.forEach(item=>{
    cartItemsEl.innerHTML+=`<li>${item.name} - ${item.price} درهم</li>`;
    total+=item.price;
  });
  cartTotalEl.textContent=total;
  cartCountEl.textContent=cart.length;
}

document.querySelectorAll('.add-to-cart').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const card=btn.closest('.card');
    const stockEl=card.querySelector('.stock');
    let stock=parseInt(stockEl.textContent);
    if(stock>0){
      stock--;
      stockEl.textContent=stock;
      cart.push({name:card.dataset.name,price:parseInt(card.dataset.price)});
      updateCartUI();
      alert("تمت إضافة المنتج إلى السلة ✅");
    } else alert("المنتج نفد 😢");
  });
});

// Modals
const modals={privacy:document.getElementById('privacyModal'),about:document.getElementById('aboutModal'),contact:document.getElementById('contactModal'),cart:document.getElementById('cartModal')};
const btns={privacy:[document.getElementById('privacyBtn'),document.getElementById('privacyBtnFooter')],
about:[document.getElementById('aboutBtn'),document.getElementById('aboutBtnFooter')],
contact:[document.getElementById('contactBtn'),document.getElementById('contactBtnFooter')],
cart:[document.getElementById('cartBtn')]};
for(let key in btns){
  btns[key].forEach(btn=>{
    if(btn) btn.addEventListener('click',e=>{
      e.preventDefault();
      modals[key].style.display='block';
    });
  });
}
document.querySelectorAll('.modal .close').forEach(span=>{
  span.addEventListener('click',()=>{span.closest('.modal').style.display='none';});
});
window.addEventListener('click',e=>{if(e.target.classList.contains('modal')) e.target.style.display='none';});

// Checkout WhatsApp
document.getElementById('checkoutWhatsapp').addEventListener('click',()=>{
  if(cart.length===0){alert("سلة التسوق فارغة 😢"); return;}
  let message="مرحبًا، أود طلب المنتجات التالية من Brandrim:%0A";
  cart.forEach(item=>{message+=`- ${item.name} : ${item.price} درهم%0A`;});
  message+=`المجموع: ${cart.reduce((sum,item)=>sum+item.price,0)} درهم`;
  window.open(`https://wa.me/212698490007?text=${message}`,"_blank");
});

// Translation
const translations={
en:{home:"Home",services:"Services",about:"About Us",contact:"Contact",privacy:"Privacy Policy",cart:"Cart",heroTitle:"Brandrim Digital Services",heroDesc:"Web Design – Followers – Digital Marketing – IPTV",ourServices:"Our Services",followers:"Followers Increase",followersDesc:"Boost your accounts fast & professionally",addCart:"Add to Cart",reviewsTitle:"Customer Reviews",review1:"Excellent and fast service!"},
fr:{home:"Accueil",services:"Services",about:"À propos",contact:"Contact",privacy:"Politique de confidentialité",cart:"Panier",heroTitle:"Services numériques Brandrim",heroDesc:"Conception de sites – Followers – Marketing Digital – IPTV",ourServices:"Nos Services",followers:"Augmentation de Followers",followersDesc:"Boostez vos comptes rapidement et professionnellement",addCart:"Ajouter au Panier",reviewsTitle:"Avis des clients",review1:"Service excellent et rapide!"}
};

document.getElementById('langSelect').addEventListener('change',()=>{
  const lang=document.getElementById('langSelect').value;
  document.querySelectorAll('[data-lang]').forEach(el=>{
    const key=el.getAttribute('data-lang');
    if(translations[lang][key]) el.textContent=translations[lang][key];
  });
});

});