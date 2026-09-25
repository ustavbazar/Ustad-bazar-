const products=[
["diya","Decorative Diya Set",199,"🪔"],
["lights","Festival LED Lights",299,"✨"],
["gift","Premium Gift Box",499,"🎁"],
["toran","Door Toran",249,"🌸"],
["puja","Puja Thali Set",399,"🪷"],
["rangoli","Rangoli Kit",149,"🌈"],
["candles","Decorative Candles",299,"🕯️"],
["mug","Festival Gift Mug",199,"☕"]
];

let cart=JSON.parse(localStorage.getItem("cart")||"[]");
const $=x=>document.querySelector(x);

function render(list=products){
  $("#grid").innerHTML=list.map((p,i)=>`
    <article class="card">
      <div class="pic">${p[3]}</div>
      <div class="body">
        <h3>${p[1]}</h3>
        <div class="price">₹${p[2]}</div>
        <button class="primary add" onclick="add(${i})">Add to Cart</button>
      </div>
    </article>
  `).join("");
}

function save(){
  localStorage.setItem("cart",JSON.stringify(cart));
  draw();
}

function add(i){
  let x=cart.find(x=>x.i===i);
  x?x.q++:cart.push({i,q:1});
  save();
  $("#drawer").classList.remove("hide");
}

function draw(){
  let total=0,n=0;

  $("#items").innerHTML=cart.length?
  cart.map(x=>{
    let p=products[x.i];
    total+=p[2]*x.q;
    n+=x.q;

    return `
    <div class="row">
      <div class="mini">${p[3]}</div>
      <div>
        <b>${p[1]}</b><br>
        ₹${p[2]} × ${x.q}
        <div class="qty">
          <button onclick="chg(${x.i},-1)">−</button>
          <button onclick="chg(${x.i},1)">+</button>
          <button onclick="del(${x.i})">Remove</button>
        </div>
      </div>
    </div>`;
  }).join("")
  :"<p>Cart is empty.</p>";

  $("#total").textContent=total;
  $("#count").textContent=n;
}

function chg(i,d){
  let x=cart.find(x=>x.i===i);
  x.q+=d;
  if(x.q<1) del(i);
  else save();
}

function del(i){
  cart=cart.filter(x=>x.i!==i);
  save();
}

$("#cartBtn").onclick=()=>{
  $("#drawer").classList.remove("hide");
};

$("#close").onclick=()=>{
  $("#drawer").classList.add("hide");
};

$("#checkout").onclick=()=>{
  if(!cart.length) return alert("Cart is empty");
  $("#drawer").classList.add("hide");
  $("#modal").classList.remove("hide");
};

$("#x").onclick=()=>{
  $("#modal").classList.add("hide");
};

$("#search").oninput=e=>{
  render(
    products.filter(p=>
      p[1].toLowerCase().includes(e.target.value.toLowerCase())
    )
  );
};

$("#form").onsubmit=e=>{
  e.preventDefault();

  let id="UB"+Date.now().toString().slice(-7);

  $("#form").classList.add("hide");
  $("#done").classList.remove("hide");

  $("#done").innerHTML=`
    <b>Order placed successfully 🎉</b><br>
    Order ID: ${id}<br><br>
    This demo stores the order locally.
  `;

  cart=[];
  save();
};

render();
draw();script.js
