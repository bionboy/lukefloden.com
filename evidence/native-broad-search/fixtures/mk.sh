#!/bin/bash
cd $(dirname "$0")
TAIL='<script>document.write("<p>"+Array.from({length:60},(_,i)=>"Line "+i).join("</p><p>")+"</p>")</script><script src="hud.js"></script>'
mk(){ { cat _head.inc; echo "<title>$1</title>"; cat; echo "$TAIL"; } > $1.html; }
mk base </dev/null
mk osb <<'EOF'
<style>html{overscroll-behavior:none}</style>
EOF
mk popover <<'EOF'
<style>#pp{position:fixed;inset:-200px 0 auto 0;margin:0;border:0;padding:0;width:auto;height:420px;background:url(photo.jpg) center/cover;opacity:.85;pointer-events:none}</style>
<div id=pp popover=manual></div><script>pp.showPopover()</script>
EOF
mk backdrop <<'EOF'
<style>#dd{background:transparent;border:0;pointer-events:none}#dd::backdrop{background:url(photo.jpg) center/cover;opacity:.6}</style>
<dialog id=dd>dialog</dialog><script>dd.showModal()</script>
EOF
mk borderimg <<'EOF'
<style>body{border-image:url(photo.jpg) 30% stretch;border-image-width:0;border-image-outset:300px 0;border-style:solid;border-width:0}</style>
EOF
mk vt <<'EOF'
<style>::view-transition{background:url(photo.jpg) center/cover}::view-transition-group(root){animation-duration:20s}::view-transition-old(root),::view-transition-new(root){animation-duration:20s;opacity:.5}</style>
<button onclick="document.startViewTransition(()=>{document.body.style.color='yellow'})" style="position:absolute;top:120px;left:20px;font-size:20px">start VT</button>
EOF
mk colrev <<'EOF'
<style>html{display:flex;flex-direction:column-reverse;height:100%;overflow:auto}body{flex:none}</style>
EOF
