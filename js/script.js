const useWebP = (()=>{ try{ return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp')===0; }catch(e){ return false; }})();
const imgSrc = p => useWebP ? p.replace(/\.jpg$/, '.webp') : p;
// low-end detection: 2GB / old chipset auto-tune without design change (mirrors html.low-end early script)
const isLowEnd = (()=>{ try{
  const m=navigator.deviceMemory||8; const c=navigator.hardwareConcurrency||8;
  const cn=navigator.connection; const sd=cn&&cn.saveData; const slow=cn&&/2g/.test(cn.effectiveType||'');
  const low = m<=4 || c<=4 || sd || slow;
  if(low) document.documentElement.classList.add('low-end');
  return low || document.documentElement.classList.contains('low-end');
}catch(e){ return document.documentElement.classList.contains('low-end'); }})();
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// i18n: ID default, EN for Asia - header switch, no design change
const I18N = {
  id: {
    nav_home:"Beranda", nav_about:"Tentang", nav_rules:"Aturan", nav_groups:"Daftar Grup",
    hero_title:"Xiaomi Federation <span>Indonesia</span>", hero_desc:"Tempat kumpul Mi Fans se-Indonesia. Cari grup sesuai HP-mu, tanya oprek, share ROM, langsung join.", hero_cta1:"Cari Grup HP-mu →", hero_cta2:"Join Grup XFI ↗",
    about_title:"Apa itu <span>XFI?</span>", about_p1:'XFI itu rumah bareng <span id="aboutGroupsCount">110</span>+ grup Telegram Xiaomi se-Indonesia. Dari yang hobi oprek sampai yang cuma mau nanya “HP ini worth it gak?” semua ngumpul di sini.', about_p2:"Kalau ada spam atau scam, sekali diblok di satu grup, otomatis keblok di semua grup XFI. Jadi diskusinya tetap bersih dan nyaman.", about_c1_b:"Bebas Spam", about_c1_s:"Blok sekali, bersih di semua grup", about_c2_b:"Saling Bantu", about_c2_s:"Jawaban cepat dari sesama user", about_c3_b:"Ngobrol 24 Jam", about_c3_s:"Ada terus yang standby",
    rules_title:"Aturan <span>XFI</span>", rules_sub:"Berlaku di semua grup tertaut XFI. Sopan, tertib, biar diskusi tetap nyaman buat semua.", r0_b:"Aturan bisa berubah sewaktu-waktu", r0_p:"Selalu cek pembaruan biar tidak ketinggalan. Info terbaru selalu diumumkan.", r1_b:"Wajib pakai username", r1_p:'Biar gampang di-tag dan dihubungi. Belum punya? Buat dulu di <a href="https://t.me/username" target="_blank" rel="noopener">t.me/username</a>', r2_b:"Saling menghormati", r2_p:"Sopan ke anggota dan admin. No SARA, no rasis, no toxic berlebihan.", r3_b:"Jangan spam atau flood", r3_p:"Hindari pesan berulang, huruf gede berlebihan, atau OOT yang ganggu diskusi.", r4_b:"ROM, kernel, modul berbayar dilarang", r4_p:'Jangan bahas atau share yang berbayar. Hargai dev yang gratis. <a href="https://t.me/XiaomiFederationIndonesia/495" target="_blank" rel="noopener">info</a>', r5_b:"Aplikasi bajakan dilarang", r5_p:'Jangan share APK crack, tani, atau mod ilegal. Termasuk channelnya. <a href="https://t.me/XiaomiFederationIndonesia/1119" target="_blank" rel="noopener">info</a>', r6_b:"Dilarang promosi", r6_p:"No iklan, no link phishing, no bahas Bitcoin atau money game.", r7_b:"No cheat", r7_p:'Jangan bahas, share, atau pakai cheat game online. Fair play ya. <a href="https://t.me/XiaomiFederationIndonesia/1123" target="_blank" rel="noopener">info</a>', r8_b:"Hindari konten sensitif", r8_p:"No pornografi, no LGBT, dan topik sensitif lain yang tidak nyambung sama Xiaomi.", r9_b:"Jasa remote", r9_p:'XFI itu gratis untuk berbagi ilmu. Jasa remote tidak didukung karena rawan tipu. Admin bisa kasih peringatan sampai fban. Donasi sukarela sebagai terima kasih tetap boleh. <a href="https://t.me/XiaomiFederationIndonesia/1492" target="_blank" rel="noopener">info selengkapnya</a>', r10_b:"Balik lagi ke aturan 0", r10_p:"Patuhi semuanya dan pantau terus update aturannya.", rules_foot:"Makasih udah jaga grup tetap kondusif! 2026 · XFI",
    groups_title:"Daftar Grup Tertaut <span>XFI</span>", groups_sub:'<span id="totalGroupsText">110</span> grup aktif. Pilih kategori di bawah, langsung ketemu grup yang pas.', results_hint:"Pilih kategori untuk filter", search_ph:"Cari HP-mu… misal: ginkgo, tanzanite, POCO X3 atau \"Note 12\"",
    stat_groups:"Grup Tertaut", stat_members:"Member Grup", stat_codenames:"Codename", stat_cats:"Kategori",
    footer_desc:"Rumah Mi Fans Indonesia di Telegram, dari newbie sampai opreker.", footer_quick:"Link Cepat", footer_link_home:"Beranda", footer_link_about:"Tentang XFI", footer_link_rules:"Aturan XFI", footer_link_groups:"Daftar Grup", footer_contact:"Kontak", footer_link_chat:"@xfichat Grup", footer_link_channel:"Channel Pengumuman", footer_link_admin:"@noticesa Admin", footer_copy:"© 2026 XFI - Xiaomi Federation Indonesia. Bukan afiliasi resmi Xiaomi Corp. Dibuat untuk Mi Fans.", nav_cta:"Gabung Telegram", footer_meta:"110 Grup, 6 Kategori, Se-Indonesia", footer_donate:"Donasi ♡", groups_missing:'Grup kamu belum ada? <a href="https://t.me/noticesa" target="_blank" rel="noopener">Hubungi @noticesa</a> di Telegram.', visits_label:"kunjungan"
  },
  en: {
    nav_home:"Home", nav_about:"About", nav_rules:"Rules", nav_groups:"Groups",
    hero_title:"Xiaomi Federation <span>Indonesia</span>", hero_desc:"Home of Mi Fans across Indonesia. Find your device group, ask about mods, share ROMs, join instantly.", hero_cta1:"Find Your Device →", hero_cta2:"Join XFI Group ↗",
    about_title:"What is <span>XFI?</span>", about_p1:'XFI is home to <span id="aboutGroupsCount">110</span>+ Xiaomi Telegram groups across Indonesia. From modders to casuals asking “is this phone worth it?”, all gather here.', about_p2:"Spam or scam? Once blocked in one group, automatically blocked in all XFI groups. Discussion stays clean and cozy.", about_c1_b:"Spam-Free", about_c1_s:"Block once, clean everywhere", about_c2_b:"Help Each Other", about_c2_s:"Quick answers from fellow users", about_c3_b:"24/7 Chat", about_c3_s:"Always someone standby",
    rules_title:"XFI <span>Rules</span>", rules_sub:"Applies to all XFI groups. Be polite, stay orderly, keep discussion comfy for everyone.", r0_b:"Rules can change anytime", r0_p:"Always check for updates. Latest info will be announced.", r1_b:"Username required", r1_p:'Easy to tag and contact. Don\'t have one? Create at <a href="https://t.me/username" target="_blank" rel="noopener">t.me/username</a>', r2_b:"Respect everyone", r2_p:"Be polite to members and admins. No SARA, no racism, no excessive toxicity.", r3_b:"No spam or flood", r3_p:"Avoid repeated messages, caps, or off-topic that disrupts discussion.", r4_b:"Paid ROM, kernel, module prohibited", r4_p:'Don\'t discuss or share paid stuff. Respect free devs. <a href="https://t.me/XiaomiFederationIndonesia/495" target="_blank" rel="noopener">info</a>', r5_b:"Pirated apps prohibited", r5_p:'Don\'t share cracked APKs. Includes channels. <a href="https://t.me/XiaomiFederationIndonesia/1119" target="_blank" rel="noopener">info</a>', r6_b:"No promotion", r6_p:"No ads, no phishing links, no Bitcoin or money games.", r7_b:"No cheat", r7_p:'Don\'t discuss, share, or use online game cheats. Fair play. <a href="https://t.me/XiaomiFederationIndonesia/1123" target="_blank" rel="noopener">info</a>', r8_b:"Avoid sensitive content", r8_p:"No pornography, no LGBT, and other sensitive topics unrelated to Xiaomi.", r9_b:"Remote service", r9_p:'XFI is free for sharing knowledge. Remote service not supported due to scam risk. Admins may warn up to fban. Voluntary donations welcome. <a href="https://t.me/XiaomiFederationIndonesia/1492" target="_blank" rel="noopener">info</a>', r10_b:"Back to rule 0", r10_p:"Follow all and keep monitoring updates.", rules_foot:"Thanks for keeping the group conducive! 2026 · XFI",
    groups_title:"XFI Linked <span>Groups</span>", groups_sub:'<span id="totalGroupsText">110</span> active groups. Choose category below to find the right one.', results_hint:"Choose category to filter", search_ph:'Search your phone… e.g. ginkgo, tanzanite, POCO X3 or "Note 12"',
    stat_groups:"Linked Groups", stat_members:"Members", stat_codenames:"Codenames", stat_cats:"Categories",
    footer_desc:"Home of Mi Fans Indonesia on Telegram, from newbie to modder.", footer_quick:"Quick Links", footer_link_home:"Home", footer_link_about:"About XFI", footer_link_rules:"XFI Rules", footer_link_groups:"Groups", footer_contact:"Contact", footer_link_chat:"@xfichat Group", footer_link_channel:"Channel", footer_link_admin:"@noticesa Admin", footer_copy:"© 2026 XFI - Xiaomi Federation Indonesia. Not affiliated with Xiaomi Corp. Made for Mi Fans.", nav_cta:"Join Telegram", footer_meta:"110 Groups, 6 Categories, Across Indonesia", footer_donate:"Donate ♡", groups_missing:'Missing your group? <a href="https://t.me/noticesa" target="_blank" rel="noopener">Contact @noticesa</a> on Telegram.', visits_label:"visits"
  }
};
let currentLang = localStorage.getItem('xfi-lang') || (navigator.language && navigator.language.startsWith('en') ? 'en' : 'id');
try{ const pl=new URLSearchParams(location.search).get('lang'); if(pl==='en' || pl==='id') currentLang=pl; }catch(e){}
function applyLang(lang){
  const doApply=()=>{
    currentLang = (lang==='en' ? 'en' : 'id');
    localStorage.setItem('xfi-lang', currentLang);
    document.documentElement.lang = currentLang;
    const d=I18N[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k=el.getAttribute('data-i18n');
      if(d[k]!==undefined) el.innerHTML=d[k];
    });
    const inp=document.getElementById('searchInput');
    if(inp && d.search_ph) inp.placeholder=d.search_ph;
    const tog=document.getElementById('langToggle');
    if(tog){ tog.textContent = currentLang==='id' ? 'EN' : 'ID'; try{ tog.animate([{transform:'scale(0.9) rotate(-6deg)'},{transform:'scale(1) rotate(0)'}],{duration:320, easing:'cubic-bezier(0.16,1,0.3,1)'}); }catch(e){} }
    try{
      const u=new URL(location.href);
      if(currentLang==='en') u.searchParams.set('lang','en'); else u.searchParams.delete('lang');
      history.replaceState(null,'',u);
    }catch(e){}
  };
  if(!isLowEnd && !isReducedMotion && document.startViewTransition){
    try{ document.startViewTransition(doApply); }catch(e){ doApply(); }
  } else { doApply(); }
}
const groups = [
  {name:"XFI | Front-End", handle:"@xfichat", members:"1.2K", desc:"Grup diskusi utama XFI. [ X F I ] [ MiHub ]", link:"https://t.me/xfichat", img:"assets/images/xfi-group.jpg", type:"group", device:"XFI"},
  {name:"Xiaomi Redmi Note 4/4X (Mido)", handle:"@rn4official", members:"4.2K", desc:"Grup resmi Redmi Note 4/4X (Mido). Diskusi, oprek, HyperOS & custom ROM.", link:"https://t.me/rn4official", img:"assets/images/rn4-group.jpg", type:"group", device:"Note 4"},
  {name:"Xiaomi Redmi Note 6 Pro (Tulip)", handle:"@IndoTulip", members:"1.5K", desc:"Grup resmi Redmi Note 6 Pro Tulip Indonesia. Supported by XFI.", link:"https://t.me/IndoTulip", img:"assets/images/tulip-group.jpg", type:"group", device:"Note 6"},
  {name:"Xiaomi Redmi Note 7 (Lavender)", handle:"@RedmiNote7Indonesia", members:"14.7K", desc:"Grup resmi Redmi Note 7 Lavender.", link:"https://t.me/RedmiNote7Indonesia", img:"assets/images/lavender-group.jpg", type:"group", device:"Note 7"},
  {name:"Xiaomi Redmi Note 8 (Ginkgo)", handle:"@redminote8indonesia", members:"7.3K", desc:"Group Ginkgo Indonesia. Supported by XFI", link:"https://t.me/redminote8indonesia", img:"assets/images/ginkgo-group.jpg", type:"group", device:"Note 8"},
  {name:"Xiaomi Redmi Note 8 Pro (Begonia)", handle:"@redminote8proindonesia", members:"5.0K", desc:"Grup Redmi Note 8 Pro Begonia Indonesia.", link:"https://t.me/redminote8proindonesia", img:"assets/images/begonia-group.jpg", type:"group", device:"Note 8 Pro"},
  {name:"Xiaomi Redmi Note 9 (Merlin)", handle:"@RN9_Indonesia", members:"5.0K", desc:"Grup resmi Redmi Note 9 Merlin Indonesia.", link:"https://t.me/RN9_Indonesia", img:"assets/images/merlin-group.jpg", type:"group", device:"Note 9"},
  {name:"Xiaomi Redmi Note 9 Pro (Joyeuse)", handle:"@RN9ProIndonesia", members:"5.2K", desc:"Grup resmi Redmi Note 9 Pro Jayus/Joyeuse.", link:"https://t.me/RN9ProIndonesia", img:"assets/images/joyeuse-group.jpg", type:"group", device:"Note 9 Pro"},
  {name:"Xiaomi Redmi Note 10S / POCO M5S (Rosemary)", handle:"@RedmiNote10SIndonesia", members:"4.9K", desc:"Grup Redmi Note 10S Rosemary Indonesia.", link:"https://t.me/RedmiNote10SIndonesia", img:"assets/images/rosemary-group.jpg", type:"group", device:"Note 10S"},
  {name:"Xiaomi Redmi Note 10 Pro (Sweet)", handle:"@RedmiNote10ProID", members:"8.1K", desc:"Grup Redmi Note 10 Pro Sweet (Manis) Indonesia.", link:"https://t.me/RedmiNote10ProID", img:"assets/images/sweet-group.jpg", type:"group", device:"Note 10 Pro"},
  {name:"Xiaomi Redmi Note 11 (Spesn)", handle:"@RN11Indonesia", members:"3.6K", desc:"Grup Redmi Note 11 Spesn NFC Indonesia.", link:"https://t.me/RN11Indonesia", img:"assets/images/spesn-group.jpg", type:"group", device:"Note 11"},
  {name:"Xiaomi Redmi Note 12 4G NFC (Topaz)", handle:"@RedmiNote12Indonesia", members:"2.8K", desc:"Grup Redmi Note 12 Topaz 4G NFC Indonesia.", link:"https://t.me/RedmiNote12Indonesia", img:"assets/images/topaz-group.jpg", type:"group", device:"Note 12"},
  {name:"Xiaomi Redmi Note 12 Pro 5G (Ruby)", handle:"@RN12PRO_ID", members:"657", desc:"Grup Redmi Note 12 Pro 5G Ruby Indonesia.", link:"https://t.me/RN12PRO_ID", img:"assets/images/ruby-group.jpg", type:"group", device:"Note 12 Pro"},
  {name:"Xiaomi Redmi Note 13 4G NFC (Sapphiren)", handle:"@RedmiNote13Indonesia", members:"1.7K", desc:"Grup Redmi Note 13 Sapphiren Indonesia.", link:"https://t.me/RedmiNote13Indonesia", img:"assets/images/sapphire-group.jpg", type:"group", device:"Note 13"},
  {name:"Xiaomi Redmi Note 13 Pro 5G / POCO X6 5G (Garnet)", handle:"@GarnetIndonesia", members:"1.8K", desc:"Grup Redmi Note 13 Pro 5G / POCO X6 5G Garnet Indonesia.", link:"https://t.me/GarnetIndonesia", img:"assets/images/garnet-group.jpg", type:"group", device:"Garnet"},
  {name:"Xiaomi Redmi Note 13 Pro+ 5G (Zircon)", handle:"@zirconid", members:"117", desc:"Grup Redmi Note 13 Pro+ 5G Zircon Indonesia.", link:"https://t.me/zirconid", img:"assets/images/zircon-group.jpg", type:"group", device:"Zircon"},
  {name:"Xiaomi Redmi Note 14 4G (Tanzanite)", handle:"@RN14ID", members:"1.6K", desc:"Grup Redmi Note 14 4G Tanzanite Indonesia.", link:"https://t.me/RN14ID", img:"assets/images/tanzanite-group.jpg", type:"group", device:"Tanzanite"},
  {name:"Xiaomi Redmi 9 (Lancelot)", handle:"@redmi_9indonesia", members:"3.0K", desc:"Grup Redmi 9 Lancelot Indonesia.", link:"https://t.me/redmi_9indonesia", img:"assets/images/lancelot-group.jpg", type:"group", device:"Redmi 9"},
  {name:"Xiaomi Redmi 9A / 10A (Dandelion)", handle:"@R9AIndonesia", members:"1.5K", desc:"Grup Redmi 9A/10A Dandelion Indonesia.", link:"https://t.me/R9AIndonesia", img:"assets/images/dandelion-group.jpg", type:"group", device:"Redmi 9A"},
  {name:"Xiaomi Redmi 10 (Selene)", handle:"@Redmi_10ID", members:"1.6K", desc:"Grup Redmi 10 Selene/Selenes Indonesia.", link:"https://t.me/Redmi_10ID", img:"assets/images/selene-group.jpg", type:"group", device:"Redmi 10"},
  {name:"Xiaomi Redmi Note 3 Pro (Kenzo)", handle:"@RN3ProIndonesia", members:"879", desc:"TEMPAT DISKUSI SEPUTAR XIAOMI REDMI NOTE 3 PRO Device: Kenzo | Kate Channel: @CB_nTu21 Channel Screenshot: @roms_ss_kenzo Gengkapak : @GengKapak", link:"https://t.me/RN3ProIndonesia", img:"assets/images/rn3proindonesia-group.jpg", type:"group", device:"Redmi Note 3 Pro"},
  {name:"Xiaomi Redmi Note 4 MTK (Nikel)", handle:"@redmi_note_4x_mediatek", members:"2.1K", desc:"Grup Xiaomi Redmi Note 4 MTK (Nikel) Indonesia.", link:"https://t.me/redmi_note_4x_mediatek", img:"assets/images/redmi_note_4x_mediatek-group.jpg", type:"group", device:"Redmi Note 4 MTK"},
  {name:"Xiaomi Redmi Note 4X (Mido)", handle:"@RedmiNote4XIndonesia", members:"4.3K", desc:"Redmi Note 4X / 4 🇮🇩 (Mido) 📺Channel : @MidoID_Update 😂OT Group : @OOT_RedmiNote4XIndonesia 📷Photography Group : @XiaomiPhotographyID 🛠Storehouse : @Gudangtdspya 👁Supported Fed : @", link:"https://t.me/RedmiNote4XIndonesia", img:"assets/images/redminote4xindonesia-group.jpg", type:"group", device:"Redmi Note 4X"},
  {name:"Xiaomi Redmi Note 5A Prime (Ugg)", handle:"@redminote_5aid", members:"3K", desc:"Membahas tentang hal - hal seputar Xiaomi Redmi Note 5A. Pastikan selalu mengecek update! Mitra: @redmi8aindonesia @R9AIndonesia @gabutersllc Official channel: @redminote5a_channel", link:"https://t.me/redminote_5aid", img:"assets/images/redminote_5aid-group.jpg", type:"group", device:"Redmi Note 5A Prime"},
  {name:"Xiaomi Redmi Note 5 Pro (WhyRed)", handle:"@RN5Indonesia", members:"2K", desc:"Tempat belajar dan berbagi pengguna perangkat Xiaomi Redmi Note 5 dengan kode nama \"Whyred\" di Indonesia. Link for join : https://t.me/RN5Indonesia Link for join Off-topic : @...", link:"https://t.me/RN5Indonesia", img:"assets/images/rn5indonesia-group.jpg", type:"group", device:"Redmi Note 5 Pro"},
  {name:"Xiaomi Redmi Note 10 (Mojito/Sunny)", handle:"@RedmiNote10ID", members:"5.1K", desc:"Redmi Note 10 Indonesia Group🇮🇩 📺Channel: @RedmiNote10IDUpdate 🎮Gaming : @XiaomiGamersID 📷Photography : @XiaomiPhotographyID 😂Out Off Topic : @ootnote10series Supported by : , @Onl", link:"https://t.me/RedmiNote10ID", img:"assets/images/redminote10id-group.jpg", type:"group", device:"Redmi Note 10"},
  {name:"Xiaomi Redmi Note 10 5G (Camellian)", handle:"@CamellianIndonesia", members:"1.2K", desc:"Camellian Group Indonesia , Poco M3 Pro 5G , Redmi Note 10 5G 📺Channel : @CamellianUpdate 🎮Gaming Group : @XiaomiGamersID 🎮Gaming Group : @PocophoneIDGamingOfficial 📷Photography Gr", link:"https://t.me/CamellianIndonesia", img:"assets/images/camellianindonesia-group.jpg", type:"group", device:"Redmi Note 10 5G"},
  {name:"Xiaomi Redmi Note 11 Pro (Viva)", handle:"@RedmiNote11ProID", members:"1.5K", desc:"Group Xiaomi Redmi Note 11 Pro 📺Channel : @RedmiNote11ProIDUpdate 📷Photography Group. : @XiaomiPhotographyID 🎮Gaming Group : @XiaomiGamersID 🛠Storehouse : @XiaomiSourceIndonesia Su", link:"https://t.me/RedmiNote11ProID", img:"assets/images/redminote11proid-group.jpg", type:"group", device:"Redmi Note 11 Pro"},
  {name:"Xiaomi Redmi Note 11 Pro 5G (Veux)", handle:"@redminote11pro5g", members:"1.1K", desc:"Grup Veux Indonesia 📺Channel : @RedmiNote11pro5gUpdate 📷Photography Group. : @XiaomiPhotographyID 🎮Gaming Group : @XiaomiGamersID 🛠Storehouse : @XiaomiSourceIndonesia Supported by:", link:"https://t.me/redminote11pro5g", img:"assets/images/redminote11pro5g-group.jpg", type:"group", device:"Redmi Note 11 Pro 5G"},
  {name:"Xiaomi Redmi Note 13 5G (Iron)", handle:"@Note135GID", members:"594", desc:"OFFICIAL Redmi Note 13 5G Indonesia Group | #MediatekPejuangan 👥 Group : @Note135GID 📺 Channel : @Note135GIDUpdates 🤣 OOT Group : @RMTKG_OOT 📷 Photography Group : @RN9_Photography", link:"https://t.me/Note135GID", img:"assets/images/note135gid-group.jpg", type:"group", device:"Redmi Note 13 5G"},
  {name:"Xiaomi Redmi Note 13 Pro (Emerald)", handle:"@EmeraldID", members:"487", desc:"Selamat Datang Di Grup POCO M6 Pro 4G | REDMI Note 13 Pro 4G Emerald Indonesia 🇮🇩 Channel : @EmeraldIDC OOT : @RMTKG_OOT Supported By XFI | @XiaomiFederationIndonesia", link:"https://t.me/EmeraldID", img:"assets/images/emeraldid-group.jpg", type:"group", device:"Redmi Note 13 Pro"},
  {name:"Xiaomi Redmi Note 14 5G (Beryl)", handle:"@BerylIndonesia", members:"707", desc:"Redmi Note 14 5G POCO M7 Pro 5G Codename: Beryl 👥 Group : @Berylindonesia 📺 Channel : @Berylupdates 🛍FJB: @xiaomiempire 📷 Photography : @XiaomiPhotographyID 🤣 OOT Group : @RMTKG_OO", link:"https://t.me/BerylIndonesia", img:"assets/images/berylindonesia-group.jpg", type:"group", device:"Redmi Note 14 5G"},
  {name:"Xiaomi Redmi Note 14 Pro 5G (Malachite)", handle:"@MalachiteIndonesia", members:"868", desc:"Redmi Note 14 Pro 5G/POCO X7 Malachite Indonesia 🇮🇩 Group: @MalachiteIndonesia Channel: @MalachiteUpdate Backup: @backupmalachite ------------------- Photography: @XiaomiPhotograph", link:"https://t.me/MalachiteIndonesia", img:"assets/images/malachiteindonesia-group.jpg", type:"group", device:"Redmi Note 14 Pro 5G"},
  {name:"Xiaomi Redmi Note 14 Pro+ 5G (Amethyst)", handle:"@RN14ProPlusID", members:"757", desc:"Redmi Note 14 Pro+ 5G | Amethyst 🇮🇩 Group: @RN14ProPlusID Channel: @AmethystUpdate 🛍️FJB: @xiaomiempire Supported by: @xfichat | @tdspya | sfx", link:"https://t.me/RN14ProPlusID", img:"assets/images/rn14proplusid-group.jpg", type:"group", device:"Redmi Note 14 Pro+ 5G"},
  {name:"Xiaomi Redmi Note 15 (Spinel)", handle:"@REDMINote15Indo", members:"543", desc:"REDMI Note 15 Group 🇮🇩 Channel: @REDMINote15Update Photography: @XiaomiPhotographyID Support by : @tdspya | XFI | SFX", link:"https://t.me/REDMINote15Indo", img:"assets/images/redminote15indo-group.jpg", type:"group", device:"Redmi Note 15"},
  {name:"Xiaomi Redmi Note 15 5G (Kunzite)", handle:"@kunziteid", members:"1.4K", desc:"channel updates : @KunziteIDUpdates 🛠 Storehouse : @Gudangtdspya Supported by: , @tdspya federation", link:"https://t.me/kunziteid", img:"assets/images/kunziteid-group.jpg", type:"group", device:"Redmi Note 15 5G"},
  {name:"Xiaomi Redmi Note 15 Pro 5G (Lapis)", handle:"@RN15ProID", members:"74", desc:"Channel: @RN15ProUpdate Fed: @xfichat", link:"https://t.me/RN15ProID", img:"assets/images/rn15proid-group.jpg", type:"group", device:"Redmi Note 15 Pro 5G"},
  {name:"Xiaomi Redmi Note 15 Pro+ 5G (Flourite)", handle:"@FlouriteID", members:"77", desc:"- Channel : @FlouriteUpdate - Discussion : @FlouriteID Supported by: @xfichat", link:"https://t.me/FlouriteID", img:"assets/images/flouriteid-group.jpg", type:"group", device:"Redmi Note 15 Pro+ 5G"},
  {name:"Xiaomi Redmi A1 (Ice)", handle:"@RA1IND", members:"97", desc:"Channel: @RA1INDC OOT : @RMTKG_OOT Supported by: * @XiaomiFederationIndonesia | XFI", link:"https://t.me/RA1IND", img:"assets/images/ra1ind-group.jpg", type:"group", device:"Redmi A1"},
  {name:"Xiaomi Redmi A2 (Water)", handle:"@RA2_ID", members:"117", desc:"Channel: @RA2ID_CH OTT : @RMTKG_OOT Supported by: * @XiaomiFederationIndonesia | XFI", link:"https://t.me/RA2_ID", img:"assets/images/ra2_id-group.jpg", type:"group", device:"Redmi A2"},
  {name:"Xiaomi Redmi A3 (Blue)", handle:"@RedmiA3Indonesia", members:"233", desc:"Grup Xiaomi Redmi A3 (Blue) Indonesia.", link:"https://t.me/RedmiA3Indonesia", img:"assets/images/redmia3indonesia-group.jpg", type:"group", device:"Redmi A3"},
  {name:"Xiaomi Redmi A5 (Serenity)", handle:"@RedmiA5Official", members:"851", desc:"‼️Pasang Username Sebelum Join. Disscusion Group Redmi A5 / POCO C71 Indonesia 🇮🇩 Group : @RedmiA5Official Channel : @RedmiA5_Updates Supported By: XFI", link:"https://t.me/RedmiA5Official", img:"assets/images/redmia5official-group.jpg", type:"group", device:"Redmi A5"},
  {name:"Xiaomi Redmi 1S (Kaskus)", handle:"@Redmi1S_Kaskus", members:"144", desc:"paguyuban pengguna Redmi 1S Kaskus, dan pengguna Xiaomi pada umumnya", link:"https://t.me/Redmi1S_Kaskus", img:"assets/images/redmi1s_kaskus-group.jpg", type:"group", device:"Redmi 1S"},
  {name:"Xiaomi Redmi 2 Prime", handle:"@r2pindo", members:"245", desc:"Keep sharing n Salam Bootlove.", link:"https://t.me/r2pindo", img:"assets/images/r2pindo-group.jpg", type:"group", device:"Redmi 2 Prime"},
  {name:"Xiaomi Redmi 4A (Rolex)", handle:"@RolexIndonesia", members:"4.9K", desc:"Selamat datang di Grup Redmi 4A Indonesia Channel Update : @RolexIndonesiaChannel File Storage : @RolexIndonesiaDokumen Off Topic : @Redmi4AOOT Created : 28 Oct 2017", link:"https://t.me/RolexIndonesia", img:"assets/images/rolexindonesia-group.jpg", type:"group", device:"Redmi 4A"},
  {name:"Xiaomi Redmi 5 (Rosy)", handle:"@rosy_indonesia", members:"1.8K", desc:"📺 Channel: @r5id_channel 📷 Photography: @XiaomiPhotographyID 😂 Out of Topic: @rosy_ot 🎮 Gaming Group: @XiaomiGamersID Supported by: , @XiaomiFederationIndonesia , @OnlineFederation", link:"https://t.me/rosy_indonesia", img:"assets/images/rosy_indonesia-group.jpg", type:"group", device:"Redmi 5"},
  {name:"Xiaomi Redmi 5 Plus (Vince)", handle:"@redmi5plusindonesia", members:"5.1K", desc:"Grup Diskusi Redmi 5 Plus Indonesia [Vince] ▪️Channel: @vinceupdate ▪️Group: @Redmi5PlusIndonesia ▪️Gudang: @XiaomiSourceIndonesia Supported by: * @XiaomiFederationIndonesia | XFI", link:"https://t.me/redmi5plusindonesia", img:"assets/images/redmi5plusindonesia-group.jpg", type:"group", device:"Redmi 5 Plus"},
  {name:"Xiaomi Redmi 6 (Cereus)", handle:"@cereusindonesia", members:"734", desc:"Group diskusi redmi 6 indonesia ° Channel : @cereusindonesiaupdate ° Out Of Topic : @RMTKG_OOT ° Photography : @PotatoPhotography ° Partner : @Cactus_Indonesia Supported by: ° @Xia", link:"https://t.me/cereusindonesia", img:"assets/images/cereusindonesia-group.jpg", type:"group", device:"Redmi 6"},
  {name:"Xiaomi Redmi 6A (Cactus)", handle:"@Cactus_Indonesia", members:"2.7K", desc:"All About Xiaomi Redmi 6A Cactus || Trying It Yourself Is The Best Experience - Channel : @CactusID_Channel - Photography : @PotatoPhotography - Out Of Topic : @RMTKG_OOT - Partner", link:"https://t.me/Cactus_Indonesia", img:"assets/images/cactus_indonesia-group.jpg", type:"group", device:"Redmi 6A"},
  {name:"Xiaomi Redmi 6 Pro (Sakura)", handle:"@SakuraIndonesia", members:"483", desc:"Selamat datang di Redmi 6 Pro Indonesia REBORN Indo Channel : @PembaruanR6P Global Channel : @Redmi6ProNews Global Grup : @Redmi6Pro_Chat Off Topic : @Sakura_OFF_Topic GSI : @GSI_S", link:"https://t.me/SakuraIndonesia", img:"assets/images/sakuraindonesia-group.jpg", type:"group", device:"Redmi 6 Pro"},
  {name:"Xiaomi Redmi 7 (Onclite)", handle:"@Redmi7ID_Group", members:"1.6K", desc:"- Group: @Redmi7ID_Group - Channel: @Redmi7ID_Channel - Repository: @Redmi7ID_Repository - Group: @Redmi7Photography - Channel: @Redmi7PhotographyChannel - Gamers: @XiaomiGamersID", link:"https://t.me/Redmi7ID_Group", img:"assets/images/redmi7id_group-group.jpg", type:"group", device:"Redmi 7"},
  {name:"Xiaomi Redmi 8 (Olive)", handle:"@Redmi8ID_Group", members:"1.4K", desc:"Redmi 8 - Olive | Indonesia Device: - Group: @Redmi8ID_Group - Channel: @Redmi8ID_Channel Others: - OOT: @RedmiOOT @Mi439oot - Gamers: @MabarXiaomi - Substratum: @SubstratumIndones", link:"https://t.me/Redmi8ID_Group", img:"assets/images/redmi8id_group-group.jpg", type:"group", device:"Redmi 8"},
  {name:"Xiaomi Redmi 8A (Olivelite)", handle:"@Redmi8AIndonesia", members:"1.8K", desc:"Membahas tentang hal - hal seputar Xiaomi Redmi 8A / 8A Pro Mitra: @redminote_5aid @R9AIndonesia Official channel: @Redmi8AUpdates @Redmi8AOfficial @Redmi8ARepository @PotatoPhotoG", link:"https://t.me/Redmi8AIndonesia", img:"assets/images/redmi8aindonesia-group.jpg", type:"group", device:"Redmi 8A"},
  {name:"Xiaomi Redmi 9C (Angelica)", handle:"@Redmi9CID", members:"2.6K", desc:"Grup Telegram Redmi 9C Indonesia #JAGAKESEHATAN Usahakan Langsung Baca Rules dan Notes Yang Tersedia. - Channel : @R9CID_Update - Photography : @PotatoPhotography - Out Of Topic :", link:"https://t.me/Redmi9CID", img:"assets/images/redmi9cid-group.jpg", type:"group", device:"Redmi 9C"},
  {name:"Xiaomi Redmi 9T (Juice)", handle:"@JuiceDiscussionID", members:"2.7K", desc:"Poco M3 x Redmi 9T (citrus/lime) 🇮🇩 💬 Discussion: @JuiceDiscussionID 📺 Channel: @JuiceIDUpdate ------------------- 🎮 Gaming: @PocophoneIDGamingOfficial 📷 Photography: @XiaomiPhotog", link:"https://t.me/JuiceDiscussionID", img:"assets/images/juicediscussionid-group.jpg", type:"group", device:"Redmi 9T"},
  {name:"Xiaomi Redmi K20 Series", handle:"@RedmiK20ProIndonesia", members:"1.3K", desc:"OFFICIAL Redmi K20 Pro | Mi 9T Pro | K20 | Mi 9T | Indonesia 🇮🇩 Channel Group : @UpdatesRedmiK20Series Photography Group : @PhotographyK20Series Gaming & OT Group : @mi9tprogamingi", link:"https://t.me/RedmiK20ProIndonesia", img:"assets/images/redmik20proindonesia-group.jpg", type:"group", device:"Redmi K20 Series"},
  {name:"Xiaomi Redmi 10C (Fog)", handle:"@Redmi_10CID", members:"2K", desc:"- Channel : @R10CID_Update - Photography : @XiaomiPhotographyID Supported by: - @XiaomiFederationIndonesia | XFI", link:"https://t.me/Redmi_10CID", img:"assets/images/redmi_10cid-group.jpg", type:"group", device:"Redmi 10C"},
  {name:"Xiaomi Redmi 10 5G (Light)", handle:"@Redmi10_5GID", members:"181", desc:"- Channel : @R105GID_Update - Photography : Showcase : @XiaomiPhotographyID GCam & Config : @RN9_Photography - Out Of Topics : @RMTKG_OOT Supported by: - @XiaomiFederationIndonesia", link:"https://t.me/Redmi10_5GID", img:"assets/images/redmi10_5gid-group.jpg", type:"group", device:"Redmi 10 5G"},
  {name:"Xiaomi Redmi 12 (Fire)", handle:"@r12_ID", members:"501", desc:"Selamat Datang Di Grup Redmi 10 2023 / 12 | Fire Indonesia🇮🇩*MT6768(G88) Grup : @R12_ID Channel : @R12ID_CH Photography Group : @RN9_Photography OOT : @RMTKG_OOT Supported By XFI |", link:"https://t.me/r12_ID", img:"assets/images/r12_id-group.jpg", type:"group", device:"Redmi 12"},
  {name:"Xiaomi Redmi 12C (Earth)", handle:"@R12CIDG", members:"373", desc:"Channel : @R12CIDC Grup : @R12CIDG OOT : @RMTKG_OOT Photography : @RN9_Photography Power by : * @XiaomiFederationIndonesia | XFI", link:"https://t.me/R12CIDG", img:"assets/images/r12cidg-group.jpg", type:"group", device:"Redmi 12C"},
  {name:"Xiaomi Redmi 13 (Moon)", handle:"@Redmi13ID", members:"466", desc:"Selamat Datang Di Grup Redmi 13 / Poco M6 | Moon Indonesia🇮🇩 Grup : @Redmi13ID Channel : @Redmi13ID_CH OOT : @RMTKG_OOT Photography Group : @RN9_Photography Supported By XFI | @Xia", link:"https://t.me/Redmi13ID", img:"assets/images/redmi13id-group.jpg", type:"group", device:"Redmi 13"},
  {name:"Xiaomi Redmi 13C (Gust)", handle:"@R13C_ID", members:"1.1K", desc:"Selamat Datang Di Grup Redmi 13C / Poco C65 | Gust Indonesia🇮🇩 👥 Grup : @R13C_ID 📺 Channel : @R13CID_CH 💬 OOT : @RMTKG_OOT 📷 Photography : @RN9_Photography 🗂 Gudang : @gudang_gust", link:"https://t.me/R13C_ID", img:"assets/images/r13c_id-group.jpg", type:"group", device:"Redmi 13C"},
  {name:"Xiaomi Redmi 14C (Lake)", handle:"@redmi14c_indo", members:"891", desc:"Redmi 14c / nfc Indonesia - Channel : @REDMI14C_UPDATE - Photography : @XiaomiPhotographyID Supported By XFI | @XiaomiFederationIndonesia", link:"https://t.me/redmi14c_indo", img:"assets/images/redmi14c_indo-group.jpg", type:"group", device:"Redmi 14C"},
  {name:"Xiaomi Redmi 15 (Creek)", handle:"@CreekIndonesia", members:"56", desc:"Selamat Datang Di Grup Redmi 15/POCO M7 🇮🇩 Grup : @CreekIndonesia Channel : @CreekUpdate Supported By: XFI | tdspya | SFX", link:"https://t.me/CreekIndonesia", img:"assets/images/creekindonesia-group.jpg", type:"group", device:"Redmi 15"},
  {name:"Xiaomi Redmi 15C (Dew)", handle:"@DewIndonesia", members:"250", desc:"Redmi 15C/Poco C85 Indonesia 🇮🇩 - Group: @DewIndonesia - Channel: @DewUpdate - Photography: @XiaomiPhotographyID Federation Support by: SFX | @tdspya | XFI", link:"https://t.me/DewIndonesia", img:"assets/images/dewindonesia-group.jpg", type:"group", device:"Redmi 15C"},
  {name:"Xiaomi Mi A1 (Tissot)", handle:"@MiAndroidOne_id", members:"1.9K", desc:"Ini adalah grup komunitas Mi A1 Indonesia. Grup ini dibuat untuk share informasi dan pengalaman seputar Mi A1 OT Group: @iFed_Off Supported By MIA1(Tissot) And AFEDI Federation", link:"https://t.me/MiAndroidOne_id", img:"assets/images/miandroidone_id-group.jpg", type:"group", device:"Mi A1"},
  {name:"Xiaomi Mi 6X (Wayne)", handle:"@Mi6XGroup", members:"1.2K", desc:"Komunitas Mi 6X (wayne) Indonesia 🇮🇩 #️⃣ Ketik /notes untuk melihat dftr catatan grup #️⃣ Ketik /rules untuk melihat dftr peraturan grup MI 6X Channel @wayne6x English Group @A26XO", link:"https://t.me/Mi6XGroup", img:"assets/images/mi6xgroup-group.jpg", type:"group", device:"Mi 6X"},
  {name:"Xiaomi Mi 8 Lite (Platina)", handle:"@mi8liteindonesia", members:"1.6K", desc:"Xiaomi Mi 8 Lite Indonesia 📺Channel : @mi8liteupdate 💬Main Group : @mi8liteindonesia 📷Photography Group : @PlatinaPhotographyID 🛒 FJB : @xiaomiempire 💬 OOT : @PocoOOT Follow : , @i", link:"https://t.me/mi8liteindonesia", img:"assets/images/mi8liteindonesia-group.jpg", type:"group", device:"Mi 8 Lite"},
  {name:"Xiaomi Mi 8 (Dipper)", handle:"@officialdipperindonesia", members:"1.5K", desc:"Untuk Channel Update Bisa Masuk Link Di Bawah: Update Dipper Indonesia https://t.me/updatedipperindonesia", link:"https://t.me/officialdipperindonesia", img:"assets/images/officialdipperindonesia-group.jpg", type:"group", device:"Mi 8"},
  {name:"Xiaomi Mi 10 Series (Apollo)", handle:"@XiaomiMi10Indonesia", members:"533", desc:"OFFICIAL GROUP XIAOMI MI 10 & MI 10 Pro Indonesia 🇮🇩 Channel : @Mi10IndonesiaUpdates Photography : @Mi10IndonesiaPhotography Code Name : umi | cmi", link:"https://t.me/XiaomiMi10Indonesia", img:"assets/images/xiaomimi10indonesia-group.jpg", type:"group", device:"Mi 10 Series"},
  {name:"Xiaomi Mi 10 T/Pro Series (Apollo)", handle:"@Mi10TSeriesID", members:"375", desc:"codename : apollo 📺Channel : @Mi10TSeriesUpdate 📷Photography Group : @XiaomiPhotographyID 😳Out of Topic Group : @PocoOOT 🛠Storehouse : @gudangtdspya 👁 Supported Fed : @tdspya", link:"https://t.me/Mi10TSeriesID", img:"assets/images/mi10tseriesid-group.jpg", type:"group", device:"Mi 10 T/Pro Series"},
  {name:"Xiaomi Mi 11 Series (Venus)", handle:"@Mi11SeriesIndonesia", members:"273", desc:"Xiaomi Mi 11 Series 🇮🇩 📺Channel : @Mi11ROMUpdates 📷Photography Group. : @bananananaxmls 🎮Gaming Group : @mabarxiaomi 😂Out Off Topic Group : (null) 👁Fed : @tdspya", link:"https://t.me/Mi11SeriesIndonesia", img:"assets/images/mi11seriesindonesia-group.jpg", type:"group", device:"Mi 11 Series"},
  {name:"Xiaomi 11T Pro (Vili)", handle:"@Mi11TProIndonesia", members:"1.2K", desc:"Mi 11T PRO (Vili) Group: @Mi11TProIndonesia Channel: @Mi11TProIDUpdate supported fed : @XiaomiFederationIndonesia", link:"https://t.me/Mi11TProIndonesia", img:"assets/images/mi11tproindonesia-group.jpg", type:"group", device:"11T Pro"},
  {name:"Xiaomi 12 Lite (Taoyao)", handle:"@Xiaomi12LiteID", members:"1.5K", desc:"Xiaomi 12 Lite Group 🇮🇩 📢 Channel : @Xiaomi12LiteIDUpdate 🎮 Gamers : @XiaomiGamersID 📷 Photography Group : @XiaomiPhotographyID * @tdspya | @XiaomiFederationIndonesia", link:"https://t.me/Xiaomi12LiteID", img:"assets/images/xiaomi12liteid-group.jpg", type:"group", device:"12 Lite"},
  {name:"Xiaomi 12 Series", handle:"@Xiaomi12SeriesID", members:"167", desc:"Xiaomi 12 Series Photography🇮🇩 Main Group : @Xiaomi12SeriesID Gcam Cloud : @Xiaomi12SeriesgcamcloudID Photography / Gcam Discussion Group : @Xiaomi12SeriesphotographyID Rom , Kerne", link:"https://t.me/Xiaomi12SeriesID", img:"assets/images/xiaomi12seriesid-group.jpg", type:"group", device:"12 Series"},
  {name:"Xiaomi 14 (Houji)", handle:"@Xiaomi_14ID", members:"25", desc:"Xiaomi 14 Group Update : @Xiaomi_14IDUpdate Photography : @XiaomiPhotographyID Supported By: - @XiaomiFederationIndonesia | XFI", link:"https://t.me/Xiaomi_14ID", img:"assets/images/xiaomi_14id-group.jpg", type:"group", device:"14"},
  {name:"Xiaomi 14T (Degas)", handle:"@xiaomi14t_indo", members:"952", desc:"Xiaomi 14T Indonesia 🇮🇩 Channel: @xiaomi14tid_ch Main Group: @xiaomi14t_indo Photography: @XiaomiPhotographyID Supported by: @xfichat | XFI | Tdspya", link:"https://t.me/xiaomi14t_indo", img:"assets/images/xiaomi14t_indo-group.jpg", type:"group", device:"14T"},
  {name:"Xiaomi 14T Pro (Rothko)", handle:"@Xiaomi14TProIndonesia", members:"945", desc:"Xiaomi 14T Pro Group 🇮🇩 Channel: @Xiaomi14TProIndonesiaUpdate Main Group: @Xiaomi14TProIndonesia Photography: @XiaomiPhotographyID Support by : @xfichat | @tdspya | sfx", link:"https://t.me/Xiaomi14TProIndonesia", img:"assets/images/xiaomi14tproindonesia-group.jpg", type:"group", device:"14T Pro"},
  {name:"Xiaomi 15T (Goya)", handle:"@Xiaomi15TIndonesia", members:"184", desc:"Xiaomi 15T Group 🇮🇩 Channel: @Xiaomi15TIndonesiaUpdate Main Group: @Xiaomi15TIndonesia Photography: @XiaomiPhotographyID Support by : @xfichat | tdspya | sfx", link:"https://t.me/Xiaomi15TIndonesia", img:"assets/images/xiaomi15tindonesia-group.jpg", type:"group", device:"15T"},
  {name:"POCO C40 (Frost)", handle:"@PocoC40ID", members:"58", desc:"- Channel : @PocoC40ID_Updates - Photography : @XiaomiPhotographyID 👁 Supported Fed : @tdspya", link:"https://t.me/PocoC40ID", img:"assets/images/pococ40id-group.jpg", type:"group", device:"POCO C40"},
  {name:"POCO F1 (Beryllium)", handle:"@PocophoneIndonesiaOfficial", members:"5.6K", desc:"POCO F1 Community Goes Dead? 🎮 Poco Gaming ID : @PocophoneIDGamingOfficial 📷 PhotographyID: @pocophonefotografi 🛠 Gudang : @gudangpocophonef1 💬 Poco ID OOT Group : @pocoOOT 🔰 Fed b", link:"https://t.me/PocophoneIndonesiaOfficial", img:"assets/images/pocophoneindonesiaofficial-group.jpg", type:"group", device:"POCO F1"},
  {name:"POCO F2 Pro (LMI)", handle:"@pocof2proindonesia", members:"1.6K", desc:"(LMI) 🎮 Poco Gaming ID : @PocophoneIDGamingOfficial 🎮 Poco F2 Pro Gaming Group: @pocof2progaming 🖼 PhotographyID: @pocophonefotografi 🛠 Gudang/CH : @PocoF2ProCH 💬 Poco ID OOT Group", link:"https://t.me/pocof2proindonesia", img:"assets/images/pocof2proindonesia-group.jpg", type:"group", device:"POCO F2 Pro"},
  {name:"POCO F3 (Alioth)", handle:"@PocoF3ID", members:"7.3K", desc:"Poco F3 Group🇮🇩 Channel: @PocoF3IDUpdate Main Group: @PocoF3ID Gaming Group: @PocophoneIDGamingOfficial Out Off Topic Group: @PocoOOT Photography: @XiaomiPhotographyID Support by :", link:"https://t.me/PocoF3ID", img:"assets/images/pocof3id-group.jpg", type:"group", device:"POCO F3"},
  {name:"POCO F4 (Munch)", handle:"@PocoF4Indonesia", members:"4.9K", desc:"Poco F4 5G (Snap870) Group 🇮🇩 📺Channel : @PocoF4IDUpdate 🎮Gaming : @PocophoneIDGamingOfficial 📷Photography : @XiaomiPhotographyID 😳Out Off Topic Group : @PocoOOT 🛠Storehouse : @Gud", link:"https://t.me/PocoF4Indonesia", img:"assets/images/pocof4indonesia-group.jpg", type:"group", device:"POCO F4"},
  {name:"POCO F4 GT (Ingres)", handle:"@PocoF4GTID", members:"73", desc:"Channel : @PocoF4GTIDUpdate OFI | XFI | tdspya", link:"https://t.me/PocoF4GTID", img:"assets/images/pocof4gtid-group.jpg", type:"group", device:"POCO F4 GT"},
  {name:"POCO F5 (Marble)", handle:"@PocoF5indo", members:"3.4K", desc:"Poco F5 Group 🇮🇩 Channel: @PocoF5IDUpdates Main Group: @PocoF5indo Gaming Group: @PocophoneIDGamingOfficial Out Off Topic Group: @PocoOOT Photography: @XiaomiPhotographyID Support", link:"https://t.me/PocoF5indo", img:"assets/images/pocof5indo-group.jpg", type:"group", device:"POCO F5"},
  {name:"POCO F6 (Peridot)", handle:"@PocoF6Indo", members:"2.2K", desc:"‼️Pasang Username Sebelum Join Channel: @PocoF6UpdateID Main Group: @PocoF6Indo Out Off Topic Group: @PocoOOT Gaming Group: @PocophoneIDGamingOfficial Photography: @XiaomiPhotograp", link:"https://t.me/PocoF6Indo", img:"assets/images/pocof6indo-group.jpg", type:"group", device:"POCO F6"},
  {name:"POCO F7 (Onyx)", handle:"@PocoF7IndonesiaGroup", members:"3.2K", desc:"Channel: @PocoF7IndonesiaUpdate Out Off Topic Group: @PocoOOT Gaming Group: @PocophoneIDGamingOfficial Photography: @XiaomiPhotographyID Pro Ver. : @PocoF7ProIndonesia Ultra Ver. :", link:"https://t.me/PocoF7IndonesiaGroup", img:"assets/images/pocof7indonesiagroup-group.jpg", type:"group", device:"POCO F7"},
  {name:"POCO F7 Pro (Zorn)", handle:"@PocoF7ProIndonesia", members:"889", desc:"Channel: @PocoF7ProIndonesiaUpdate Out Off Topic Group: @PocoOOT Gaming Group: @PocophoneIDGamingOfficial Photography: @XiaomiPhotographyID Basic Ver. : @PocoF7IndonesiaGroup Ultra", link:"https://t.me/PocoF7ProIndonesia", img:"assets/images/pocof7proindonesia-group.jpg", type:"group", device:"POCO F7 Pro"},
  {name:"POCO F7 Ultra (Miro)", handle:"@PocoF7UltraIndonesia", members:"203", desc:"‼️Pasang Username Sebelum Join Channel: @PocoF7UltraIndonesiaUpdate Out Off Topic Group: @PocoOOT Gaming Group: @PocophoneIDGamingOfficial Photography: @XiaomiPhotographyID Pro Ver", link:"https://t.me/PocoF7UltraIndonesia", img:"assets/images/pocof7ultraindonesia-group.jpg", type:"group", device:"POCO F7 Ultra"},
  {name:"POCO F8 Series", handle:"@PocoF8Indo", members:"726", desc:"Poco F8 Pro/Ultra Group 🇮🇩 Channel: @PocoF8Update Gaming Group: @PocophoneIDGamingOfficial Out Off Topic Group: @PocoOOT Photography: @XiaomiPhotographyID Support by : @tdspya | @x", link:"https://t.me/PocoF8Indo", img:"assets/images/pocof8indo-group.jpg", type:"group", device:"POCO F8 Series"},
  {name:"POCO M4 Pro (Fleur)", handle:"@pocom4proindonesia", members:"2K", desc:"POCO M4 Pro 4G (fleur) Group | #POCOnyaBeraksi #StayPOCO 👥 Group : @PocoM4ProIndonesia 📺 Channel : @PocoM4ProIdUpdate 🤓 Out Off topic Group: @RMTKG_OOT Supported by: @XiaomiFederat", link:"https://t.me/pocom4proindonesia", img:"assets/images/pocom4proindonesia-group.jpg", type:"group", device:"POCO M4 Pro"},
  {name:"POCO M5 (Stone)", handle:"@PocoM5ID", members:"1.1K", desc:"- Channel : @PocoM5IDC - Photography : Showcase : @XiaomiPhotographyID GCam & Config : @RN9_Photography - Out Of Topics : @RMTKG_OOT Supported by: - @XiaomiFederationIndonesia | XF", link:"https://t.me/PocoM5ID", img:"assets/images/pocom5id-group.jpg", type:"group", device:"POCO M5"},
  {name:"POCO X3 NFC (Surya)", handle:"@PocoX3ID", members:"12.8K", desc:"OFFICIAL Poco X3 NFC 🇮🇩 (Surya) 📺Channel : @PocoX3IDUpdate 🎮Gaming Group : @PocophoneIDGamingOfficial 📷Photography Group. : @XiaomiPhotographyID 😳Out Off Topic Group : @PocoOOT 🛠St", link:"https://t.me/PocoX3ID", img:"assets/images/pocox3id-group.jpg", type:"group", device:"POCO X3 NFC"},
  {name:"POCO X3 Pro (Vayu-Bhima)", handle:"@PocoX3ProIndonesia", members:"6.5K", desc:"Poco X3 Pro (vayu/bhima) Group: @PocoX3ProIndonesia Channel: @PocoX3ProIndonesiaUpdate Repository: @PocoX3ProIndonesiaRepository ------------------- Photography: @XiaomiPhotography", link:"https://t.me/PocoX3ProIndonesia", img:"assets/images/pocox3proindonesia-group.jpg", type:"group", device:"POCO X3 Pro"},
  {name:"POCO X3 GT (Chopin)", handle:"@PocoX3GTIndonesia", members:"67", desc:"OFFICIAL POCO X3 GT Indonesia Group | #StaySafe 👥 Group : @PocoX3GTIndonesia 📺 Channel : @ChopinUpdate 🤣 OOT Group : @RMTKG_OOT 🗂 Chest of Files : @ChopinDoc 📷 Photography Group :", link:"https://t.me/PocoX3GTIndonesia", img:"assets/images/pocox3gtindonesia-group.jpg", type:"group", device:"POCO X3 GT"},
  {name:"POCO X5 5G (Moonstone)", handle:"@PocoX5Indonesia", members:"2.3K", desc:"Grup buat Moonstone, bukan grup Redwood ini... 😭😭 📺Channel : @PocoX5IDUpdates 🎮Gaming : @PocophoneIDGamingOfficial 📷Photography : @XiaomiPhotographyID 😳Out Off Topic Group : @PocoO", link:"https://t.me/PocoX5Indonesia", img:"assets/images/pocox5indonesia-group.jpg", type:"group", device:"POCO X5 5G"},
  {name:"POCO X5 PRO (Redwood)", handle:"@PocoX5ProIndo", members:"724", desc:"Poco X5 Pro Group 🇮🇩 (Merendah Untuk Mengredwood) 📺Channel : @redwoodIDUpdate 🎮Gaming : @PocophoneIDGamingOfficial 📷Photography : @XiaomiPhotographyID 😳Out Off Topic Group : @PocoO", link:"https://t.me/PocoX5ProIndo", img:"assets/images/pocox5proindo-group.jpg", type:"group", device:"POCO X5 PRO"},
  {name:"POCO X6 Pro 5G (Duchamp)", handle:"@pocox6proid", members:"2.8K", desc:"‼️Jangan Lupa Pasang Username & Foto Channel : @pocox6proid_ch Out Off Topic Group: @PocoOOT Photography: @XiaomiPhotographyID Gaming Group: @PocophoneIDGamingOfficial 👁 Supported", link:"https://t.me/pocox6proid", img:"assets/images/pocox6proid-group.jpg", type:"group", device:"POCO X6 Pro 5G"},
  {name:"POCO X7 Pro (Rodin)", handle:"@PocoX7ProIDChat", members:"3.7K", desc:", Discussion : @PocoX7ProIDChat , Channel : @PocoX7ProID , Off Topic : @MiketekOOT Group POCO X7 reguler : @MalachiteIndonesia Supported by: @xfichat | @tdspya", link:"https://t.me/PocoX7ProIDChat", img:"assets/images/pocox7proidchat-group.jpg", type:"group", device:"POCO X7 Pro"},
  {name:"POCO X8 Pro (Klee)", handle:"@PocoX8ProINA", members:"1.2K", desc:"- Channel : @PocoX8ProChannel - Discussion : @PocoX8ProINA - Off topic : @MiketekOOT Photography : @XiaomiPhotographyID Group POCO X8 Pro Max : @POCOX8ProMaxID Supported by: @xfich", link:"https://t.me/PocoX8ProINA", img:"assets/images/pocox8proina-group.jpg", type:"group", device:"POCO X8 Pro"},
  {name:"POCO X8 Pro Max (Dash)", handle:"@POCOX8ProMaxID", members:"1.2K", desc:"Channel @POCOX8ProMaxIDUpdate Chat @POCOX8ProMaxID OOT @MiketekOOT Photography @XiaomiPhotographyID Group POCO X8 Pro @PocoX8ProINA Supported by: @xfichat | @sfxchats | @tdspya", link:"https://t.me/POCOX8ProMaxID", img:"assets/images/pocox8promaxid-group.jpg", type:"group", device:"POCO X8 Pro Max"},
  {name:"Xiaomi Gamers Indonesia (Gamers Harus Join)", handle:"@XiaomiGamersID", members:"4.1K", desc:"Komunitas Gamers Xiaomi Indonesia Melarang keras Cheater disini! OFI | tdspya | XFI", link:"https://t.me/XiaomiGamersID", img:"assets/images/xiaomigamersid-group.jpg", type:"group", device:"Gamers Indonesia"},
  {name:"Xiaomi Photography Indonesia", handle:"@XiaomiPhotographyID", members:"23.7K", desc:"All Xiaomi Devices is Here! Bagikan Jepretan & Config mu sesuai format 🤟😉 Gallery : @XiaomiGalleryID Bot : @XiaomiPhotography2Bot Support by : * @tdspya | @XiaomiFederationIndonesi", link:"https://t.me/XiaomiPhotographyID", img:"assets/images/xiaomiphotographyid-group.jpg", type:"group", device:"Photography Indonesia"},
  {name:"Xiaomi Empire (Jual Beli, lelang & Membahas Device)", handle:"@xiaomiempire", members:"5K", desc:"OOT, JUAL, BELI, LELANG, GIVE AWAY @XiaomiFederationIndonesia", link:"https://t.me/xiaomiempire", img:"assets/images/xiaomiempire-group.jpg", type:"group", device:"Empire"},
  {name:"Xiaomi Mi Community Indonesia", handle:"@MiTeleindonesia", members:"2K", desc:"Grup Resmi Mi Community Indonesia. - Mi Fans Indonesia. Support by @XiaomiFederationIndonesia", link:"https://t.me/MiTeleindonesia", img:"assets/images/miteleindonesia-group.jpg", type:"group", device:"Mi Community Indonesia"},
  {name:"Substratum Indonesia", handle:"@substratumindonesia", members:"5.2K", desc:"Substratum Indonesia not Official Share Soal Theme Substratum. Showcase : @subsindoshowcase PIRACY = FBAN Support By : XFI | tdspya | OFI", link:"https://t.me/substratumindonesia", img:"assets/images/substratumindonesia-group.jpg", type:"group", device:"Substratum Indonesia"},
  {name:"Telegram Discipline", handle:"@tdfedchat", members:"8", desc:"@tdfederation", link:"https://t.me/tdfedchat", img:"assets/images/tdfedchat-group.jpg", type:"group", device:"Telegram Discipline"},
  {name:"tdspya Federation", handle:"@tdspya", members:"1.3K", desc:"tdspya federation open group, theres no fed connected here, so you can report misunderstanding, just follow the flow fellows so you will not get banned from here. specialized : @gu", link:"https://t.me/tdspya", img:"assets/images/tdspya-group.jpg", type:"group", device:"tdspya Federation"},
  {name:"SFX", handle:"@sfxchats", members:"113", desc:"/joinfed bf01acc0-c0a7-4972-b69a-f26108a29a20", link:"https://t.me/sfxchats", img:"assets/images/sfxchats-group.jpg", type:"group", device:"SFX"}

];

let activeCategory='all', searchQ='';
const INITIAL_LIMIT = 12;
let showAll = false;
let activeDevice='all'; // compat, no UI
function syncURL(){
  try{
    const p=new URLSearchParams();
    if(searchQ) p.set('q', searchQ);
    if(activeCategory!=='all') p.set('cat', activeCategory);
    if(showAll) p.set('all','1');
    if(typeof currentLang!=='undefined' && currentLang==='en') p.set('lang','en');
    const qs=p.toString();
    const url=qs ? `${location.pathname}?${qs}${location.hash}` : `${location.pathname}${location.hash}`;
    history.replaceState(null,'',url);
  }catch(e){}
}
const VALID_CATS=['all','Redmi Note','Redmi','POCO','Xiaomi/Mi','Komunitas','Lainnya'];
function loadFromURL(){
  try{
    const p=new URLSearchParams(location.search);
    const q=p.get('q'); if(q){ searchQ=q; const inp=document.getElementById('searchInput'); if(inp) inp.value=q; }
    const cat=p.get('cat'); if(cat && VALID_CATS.includes(cat)) activeCategory=cat; else if(cat) activeCategory='all';
    if(p.get('all')==='1') showAll=true;
  }catch(e){}
}
function escHtml(s){ return s.replace(/[&<>"']/g,c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }
function highlight(text, q){
  if(!q) return escHtml(text);
  try{
    const esc=q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    return escHtml(text).replace(new RegExp(`(${esc})`,'gi'), '<mark>$1</mark>');
  }catch(e){ return escHtml(text); }
}
// cache getCategory: 109 * filters per render -> avoid string ops on low-end
const _catCache = new Map();
function getCategory(device){
  if(_catCache.has(device)) return _catCache.get(device);
  let cat;
  if(device==='XFI') cat='XFI';
  else if(['Garnet','Zircon','Tanzanite'].includes(device)) cat='Redmi Note';
  else if(device.startsWith('POCO')) cat='POCO';
  else if(device.includes('Note')) cat='Redmi Note';
  else if(device.startsWith('Redmi')) cat='Redmi';
  else if(device.startsWith('Mi ') || device.startsWith('Mi_') || device.startsWith('11T') || device.startsWith('12 ') || device.startsWith('14') || device.startsWith('15T') || device.startsWith('Mi')) cat='Xiaomi/Mi';
  else if(['Gamers Indonesia','Photography Indonesia','Empire','Mi Community Indonesia','Substratum Indonesia','Telegram Discipline','tdspya Federation','SFX'].includes(device)) cat='Komunitas';
  else cat='Lainnya';
  _catCache.set(device, cat);
  return cat;
}
function getFiltered(){
  const q=searchQ.toLowerCase();
  return groups.filter(g=>{
    const matchCategory = activeCategory==='all' || g._cat===activeCategory;
    const matchSearch = !q || g._search.includes(q);
    return matchCategory && matchSearch;
  });
}
// precompute search index + cat per group after getCategory is ready
groups.forEach(g=>{ g._cat=getCategory(g.device); g._search=`${g.name} ${g.handle} ${g.desc} ${g.device} ${g._cat}`.toLowerCase(); });
function renderCategoryBar(){
  const bar=document.getElementById('categoryBar');
  if(!bar) return;
  const cats=['all','Redmi Note','Redmi','POCO','Xiaomi/Mi','Komunitas','Lainnya'];
  const labels = currentLang==='en'
    ? {all:'All Categories','Redmi Note':'Redmi Note','Redmi':'Redmi','POCO':'POCO','Xiaomi/Mi':'Xiaomi/Mi','Komunitas':'Community','Lainnya':'Others'}
    : {all:'Semua Kategori','Redmi Note':'Redmi Note','Redmi':'Redmi','POCO':'POCO','Xiaomi/Mi':'Xiaomi/Mi','Komunitas':'Komunitas','Lainnya':'Lainnya'};
  // single pass cat counts - 1 loop vs 6 filters (6x109) - micro win on 2GB
  const cntMap={}; groups.forEach(g=>{ cntMap[g._cat]=(cntMap[g._cat]||0)+1; });
  bar.innerHTML=cats.map(c=>{
    const cnt=c==='all'?groups.length:(cntMap[c]||0);
    if(cnt===0) return '';
    return `<button class="device-pill ${activeCategory===c?'active':''}" onclick="setCategory('${c}',this)">${labels[c]} <small>${cnt}</small></button>`;
  }).join('');
}
function renderDeviceBar(){
  return;
}
function cardHtml(g, idx){
  const cleanDesc = g.desc.replace(/—/g, ',').replace(/–/g, ',').replace(/•/g, ',');
  const shortDesc = cleanDesc.length>110 ? cleanDesc.slice(0,110).replace(/\s+\S*$/,'').trim() + '…' : cleanDesc;
  // highlight search q in card text (fluid feedback)
  const q=searchQ.trim();
  const hName = q ? highlight(g.name, q) : escHtml(g.name);
  const hHandle = q ? highlight(g.handle, q) : escHtml(g.handle);
  const hDevice = q ? highlight(g.device, q) : escHtml(g.device);
  const hDesc = q ? highlight(shortDesc, q) : escHtml(shortDesc);
  const safeLink = (typeof g.link==='string' && g.link.startsWith('https://t.me/')) ? g.link : '#';
  const safeImg = imgSrc(g.img);
  const fallbackImg = g.img;
  // low-end: first 4 cards eager high-priority for LCP, rest lazy low - same visuals, faster paint
  const eager = !isLowEnd && idx < 4;
  return `<div class="g-card" role="listitem" style="--i:0">
      <img class="g-bg" src="${escHtml(safeImg)}" alt="" loading="${eager ? 'eager' : 'lazy'}" decoding="async" fetchpriority="${eager ? 'high' : 'low'}" width="320" height="320" aria-hidden="true" onload="this.classList.add('loaded')" onerror="this.onerror=null;this.src='${escHtml(fallbackImg)}';this.classList.add('loaded');">
      <div class="g-top">
        <div style="min-width:0;flex:1;overflow:hidden">
          <b style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;max-width:100%" title="${escHtml(g.name)}">${hName}</b>
          <small style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;max-width:100%">${hHandle} / ${hDevice}</small>
        </div>
        <span class="g-badge b-group">${currentLang==='en'?'Group':'Grup'}</span>
      </div>
      <div class="g-desc" title="${escHtml(cleanDesc)}">${hDesc}</div>
      <div class="g-meta"><span>${escHtml(g.members)} member</span></div>
      <div class="g-actions">
        <a class="btn-join" href="${escHtml(safeLink)}" target="_blank" rel="noopener">${currentLang==='en'?'Join Group':'Join Grup'}</a>
        <button class="btn-info" onclick="copyLink('${escHtml(safeLink)}', this)">${currentLang==='en'?'Copy Link':'Salin Link'}</button>
      </div>
    </div>`;
}
// hero photo-strip: real group photos as identity texture (DESIGN.md motif 5).
// skipped on low-end / reduced-motion: static gradient hero is the fallback.
function buildHeroStrip(){
  if(isLowEnd || isReducedMotion) return;
  const rows=['stripA','stripB','stripC','stripD','stripE'].map(id=>document.getElementById(id));
  if(!groups.length||!rows[0]||rows[0].childNodes.length) return;
  const per=window.innerWidth<600?8:12, step=7;
  const seq=(off)=>{ const out=[]; for(let i=0;i<per;i++) out.push(groups[(off+i*step)%groups.length].img); return out; };
  const mk=list=>{ const h=list.map(p=>`<img src="${imgSrc(p)}" alt="" loading="lazy" decoding="async" width="120" height="120" aria-hidden="true">`).join(''); return h+h; };
  rows.forEach((el,r)=>{ if(el) el.innerHTML=mk(seq(r)); });
  // pause hero marquee when offscreen to save GPU on mobile
  try{
    const hero=document.getElementById('beranda'), lottie=document.getElementById('heroLottie');
    if(hero && lottie && 'IntersectionObserver' in window){
      const io=new IntersectionObserver(ents=>{
        const v=ents[0]?.isIntersecting;
        lottie.style.animationPlayState=v?'running':'paused';
        rows.forEach(r=>{ if(r) r.style.animationPlayState=v?'running':'paused'; });
      },{threshold:0});
      io.observe(hero);
    }
  }catch(e){}
}
function render(){
  const doRender = ()=>{
  const grid=document.getElementById('groupGrid');
  const filtered=getFiltered();
  document.getElementById('countGroups').textContent=groups.length+'+';
  const tg=document.getElementById('totalGroupsText');
  if(tg) tg.textContent=groups.length;
  const cdn=document.getElementById('countCodenames');
  if(cdn){
    const codenames=new Set();
    groups.forEach(g=>{
      const m=g.name.match(/\(([^)]+)\)/);
      if(m) m[1].split('/').forEach(p=>{ p=p.trim(); if(p && !p.toLowerCase().includes('front')) codenames.add(p); });
    });
    cdn.textContent = (codenames.size || 95) + '+';
  }
  const cc=document.getElementById('countCats');
  if(cc) cc.textContent=new Set(groups.map(g=>g._cat)).size;
  const ag=document.getElementById('aboutGroupsCount');
  if(ag) ag.textContent=groups.length;
  const totalMember = groups.reduce((a,g)=>{
    const v=g.members.replace('~','').trim();
    if(v.endsWith('K')) return a + parseFloat(v)*1000;
    const n=parseInt(v.replace(/[^0-9]/g,''),10);
    return a + (isNaN(n)?0:n);
  },0);
  const fmt = totalMember>=1000 ? `~${(totalMember/1000).toFixed(totalMember>=100000?0:1).replace('.0','')}K` : `${totalMember}`;
  const el=document.getElementById('countMembers');
  if(el) el.textContent=fmt;
  const wrap=document.getElementById('loadMoreWrap');
  const btn=document.getElementById('loadMoreBtn');
  const info=document.getElementById('loadInfo');
  if(filtered.length===0){
    const qEsc = escHtml(searchQ);
    grid.innerHTML = currentLang==='en'
      ? `<div class="empty"><div class="empty-ic">?</div><b>No groups for “${qEsc}”</b><p>We checked 110 groups, none matched. Try a codename like “ginkgo” or pick a category above.</p><button class="btn-secondary" onclick="clearFilters()">Clear filters</button></div>`
      : `<div class="empty"><div class="empty-ic">?</div><b>Gak ketemu “${qEsc}”</b><p>Udah cek 110 grup, belum ada yang cocok. Coba codename kayak “ginkgo” atau pilih kategori di atas.</p><button class="btn-secondary" onclick="clearFilters()">Balik ke semua</button></div>`;
    document.getElementById('resultsText').textContent = currentLang==='en' ? '0 results' : '0 hasil';
    grid.className='card-grid';
    if(wrap) wrap.style.display='none';
    syncURL();
    const cf=document.getElementById('clearFilter'); if(cf) cf.style.display=(searchQ||activeCategory!=='all')?'inline-block':'none';
    return;
  }
  if(wrap) wrap.style.display='flex';
  const display = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);
  if(currentLang==='en'){
    document.getElementById('resultsText').textContent = showAll ? `Found ${filtered.length} groups` : `Showing ${display.length} of ${filtered.length} groups`;
    if(info) info.textContent = showAll ? `${filtered.length} linked groups / real photos` : `Showing ${display.length} of ${filtered.length} groups`;
  } else {
    document.getElementById('resultsText').textContent = showAll ? `Ditemukan ${filtered.length} grup` : `Menampilkan ${display.length} dari ${filtered.length} grup`;
    if(info) info.textContent = showAll ? `${filtered.length} grup tertaut / foto asli` : `Menampilkan ${display.length} dari ${filtered.length} grup`;
  }
  if(btn){
    if(filtered.length <= INITIAL_LIMIT){
      btn.style.display='none';
    } else {
      btn.style.display='inline-block';
      btn.textContent = showAll ? (currentLang==='en' ? 'Show Less' : 'Tampilkan Lebih Sedikit') : (currentLang==='en' ? `View All (${filtered.length})` : `Lihat Semua (${filtered.length})`);
    }
  }
  grid.className='card-grid';
  // batch DOM write, keep main thread free - tuned for Lihat Semua smoothness
  const doObserve = ()=>{ if(typeof observeCards==='function') observeCards(); };
  if(isLowEnd && display.length > INITIAL_LIMIT){
    grid.innerHTML='';
    let idx=0; const CHUNK=18;
    const idleFn = window.requestIdleCallback ? (cb)=>requestIdleCallback(cb,{timeout:90}) : (cb)=>setTimeout(cb,12);
    function appendChunk(){
      const slice=display.slice(idx, idx+CHUNK);
      if(!slice.length){ requestAnimationFrame(doObserve); return; }
      grid.insertAdjacentHTML('beforeend', slice.map((g,i)=>cardHtml(g, idx+i)).join(''));
      grid.querySelectorAll('.g-bg:not(.loaded)').forEach(img=>{ if(img.complete) img.classList.add('loaded'); });
      idx+=CHUNK;
      if(idx < display.length) idleFn(appendChunk);
      else requestAnimationFrame(doObserve);
    }
    appendChunk();
  } else {
    // non-low-end: single write, let CSS stagger handle it smoothly
    grid.innerHTML=display.map((g,i)=>cardHtml(g,i)).join('');
    grid.querySelectorAll('.g-bg').forEach(img=>{ if(img.complete) img.classList.add('loaded'); });
    requestAnimationFrame(doObserve);
  }
  syncURL();
  const cf=document.getElementById('clearFilter'); if(cf) cf.style.display=(searchQ||activeCategory!=='all')?'inline-block':'none';
  };
  if(!_toggleVT && !isLowEnd && !isReducedMotion && document.startViewTransition){
    try{ document.startViewTransition(doRender); }catch(e){ doRender(); }
  } else { doRender(); }
}
let _toggleVT=false;
function toggleShowAll(){
  const grid=document.getElementById('groupGrid');
  _toggleVT=true;
  const doFlip=()=>{
    showAll=!showAll;
    render();
    _toggleVT=false;
    if(showAll) requestAnimationFrame(()=>{ try{ grid.scrollIntoView({behavior:isLowEnd||isReducedMotion?'auto':'smooth', block:'start'}); }catch(e){} });
  };
  if(!isLowEnd && !isReducedMotion && document.startViewTransition){
    try{ document.startViewTransition(doFlip); }catch(e){ doFlip(); _toggleVT=false; }
  } else { doFlip(); }
}
function setDevice(dev,btn){
  return;
}
function setCategory(cat,btn){
  activeCategory=cat;
  showAll=false;
  activeDevice='all';
  document.querySelectorAll('#categoryBar .device-pill').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  btn.scrollIntoView({behavior:isLowEnd?'auto':'smooth',block:'nearest',inline:'center'});
  renderCategoryBar();
  render();
}
let searchT=null;
function showSkeleton(n=6){
  const grid=document.getElementById('groupGrid');
  if(!grid) return;
  grid.className='card-grid';
  grid.innerHTML=Array.from({length:n}).map(()=>`<div class="skeleton" aria-hidden="true"></div>`).join('');
  const wrap=document.getElementById('loadMoreWrap'); if(wrap) wrap.style.display='none';
}
function onSearch(){
  clearTimeout(searchT);
  const v=document.getElementById('searchInput').value;
  if(v && v!==searchQ) showSkeleton();
  const d=isLowEnd?180:120;
  searchT=setTimeout(()=>{ searchQ=document.getElementById('searchInput').value; showAll=false; render(); },d);
}
function showToast(msg){
  const t=document.getElementById('toast'); if(!t) return;
  t.textContent=msg; t.classList.add('show');
  try{ if(navigator.vibrate) navigator.vibrate(20); }catch(e){}
  clearTimeout(showToast._tm); showToast._tm=setTimeout(()=>t.classList.remove('show'), 1800);
}
function copyLink(url, btn){
  navigator.clipboard.writeText(url).then(()=>{
    const o=btn.textContent; btn.textContent=currentLang==='en'?'Copied!':'Tersalin!';
    showToast(currentLang==='en'?'Link copied':'Link tersalin, tinggal paste di Telegram');
    setTimeout(()=>btn.textContent=o, 1500);
  }).catch(()=>window.open(url, '_blank'));
}
function clearFilters(){
  searchQ=''; activeCategory='all'; activeDevice='all'; showAll=false;
  const inp=document.getElementById('searchInput'); if(inp) inp.value='';
  renderCategoryBar(); render();
  showToast(currentLang==='en'?'Filters cleared':'Filter balik ke awal');
  try{ document.getElementById('searchInput').focus(); }catch(e){}
}
// keyboard: Ctrl+K or / focus search, ? help, Esc clear
document.addEventListener('keydown', e=>{
  const tag=(e.target.tagName||'').toLowerCase();
  const isInput=tag==='input' || tag==='textarea' || e.target.isContentEditable;
  if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); const inp=document.getElementById('searchInput'); if(inp){ inp.focus(); inp.select(); } }
  else if(!isInput && e.key==='/'){ e.preventDefault(); const inp=document.getElementById('searchInput'); if(inp) inp.focus(); }
  else if(!isInput && e.key==='?'){ e.preventDefault(); showToast(currentLang==='en'?'/ or Ctrl+K to search, Esc to clear, ? for help':'/ atau Ctrl+K cari, Esc hapus, ? bantuan'); }
  else if(e.key==='Escape' && isInput){ e.target.blur(); }
});
function toggleMenu(){const m=document.getElementById('mobileMenu'); const b=document.querySelector('.burger'); const isOpen=m.classList.toggle('open'); if(b) b.setAttribute('aria-expanded', isOpen);}
document.addEventListener('click', e=>{
  const b=e.target.closest('.btn-join, .btn-primary');
  if(b && !isLowEnd && !isReducedMotion){
    try{ b.animate([{transform:'scale(0.97)'},{transform:'scale(1.015)'},{transform:'scale(1)'}],{duration:320, easing:'cubic-bezier(0.16,1,0.3,1)'}); }catch(_){}
  }
});
// rAF throttled scroll: nav + hero parallax, passive, avoid layout thrash on low-end
let ticking=false, lastY=0;
window.addEventListener('scroll',()=>{
  lastY=window.scrollY;
  if(!ticking){
    ticking=true;
    requestAnimationFrame(()=>{
      const nav=document.getElementById('navbar');
      if(nav) nav.classList.toggle('scrolled', lastY>10);
      // parallax disabled on low-end / reduced-motion / touch (jank on mobile scroll)
      const isCoarse = window.matchMedia('(hover:none)').matches || window.innerWidth<700;
      if(!isReducedMotion && !isLowEnd && !isCoarse){
        const bg=document.querySelector('.hero-bg');
        if(bg) bg.style.transform=`translate3d(0,${lastY*0.14}px,0) scale(${1+lastY*0.00006})`;
        const strips=document.getElementById('heroLottie');
        if(strips) strips.style.transform=`translate3d(0,${lastY*0.07}px,0)`;
      } else {
        // ensure mobile doesn't keep stale transform when resizing
        if(isCoarse){
          const bg=document.querySelector('.hero-bg');
          if(bg) bg.style.transform='';
          const strips=document.getElementById('heroLottie');
          if(strips) strips.style.transform='';
        }
      }
      ticking=false;
    });
  }
},{passive:true});
// reveal on scroll - lightweight, no MutationObserver storm
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('active'); observer.unobserve(e.target); }});
},{threshold:0.12, rootMargin:'0px 0px -40px 0px'});
function observeCards(){
  const cards=document.querySelectorAll('.g-card:not(.observed)');
  // batch in rAF to avoid layout thrash on 109 cards
  if(!cards.length) return;
  requestAnimationFrame(()=>{
    cards.forEach((el,i)=>{
      el.classList.add('observed','reveal');
      el.style.setProperty('--i', i % 12); // cap stagger 0.48s max, was 4.3s jank for 109
      observer.observe(el);
      el.addEventListener('animationend',()=>{ el.style.willChange='auto'; },{once:true});
    });
  });
}
function initReveal(){
  document.querySelectorAll('.reveal:not(.g-card)').forEach(el=>observer.observe(el));
  observeCards();
}
window.addEventListener('DOMContentLoaded',initReveal,{once:true});
// total visits: Abacus hit counter, footer subtle, fail-silently hidden
function loadVisits(){
  try{
    const wrap=document.getElementById('visitCount'), num=document.getElementById('visitNum');
    if(!wrap || !num) return;
    const host=(location.hostname||'').toLowerCase();
    const isLocal=!host || host==='localhost' || host==='127.0.0.1' || host.startsWith('192.168.') || location.protocol==='file:';
    const action=isLocal ? 'get' : 'hit';
    const ctrl=new AbortController();
    const t=setTimeout(()=>{ try{ctrl.abort();}catch(e){} },5000);
    fetch('https://abacus.jasoncameron.dev/'+action+'/xiaomifederationindonesia.vercel.app/total',{signal:ctrl.signal})
      .then(r=>{ if(!r.ok) throw new Error('http '+r.status); return r.json(); })
      .then(d=>{
        clearTimeout(t);
        const v=Number(d && d.value);
        if(!Number.isFinite(v)) return;
        num.textContent=v.toLocaleString(currentLang==='en' ? 'en-US' : 'id-ID');
        wrap.hidden=false;
      })
      .catch(()=>{ clearTimeout(t); });
  }catch(e){}
}
// defer below-fold work (groups) to idle so hero paints first - huge LCP win on HP kentang
const idle = window.requestIdleCallback ? (cb)=>requestIdleCallback(cb,{timeout:1200}) : (cb)=>setTimeout(cb,80);
idle(()=>{
  loadFromURL();
  applyLang(currentLang);
  renderCategoryBar();
  render();
  buildHeroStrip();
  loadVisits();
  requestAnimationFrame(initReveal);
});
// lang toggle
document.addEventListener('DOMContentLoaded', ()=>{
  const tog=document.getElementById('langToggle');
  if(tog){
    tog.textContent = currentLang==='id' ? 'EN' : 'ID';
    tog.addEventListener('click', ()=>{
      const next = currentLang==='id' ? 'en' : 'id';
      applyLang(next);
      renderCategoryBar();
      render();
      showToast(next==='en' ? 'Switched to English' : 'Beralih ke Indonesia');
    });
  }
});
// back/forward restores filter from URL (fluid)
window.addEventListener('popstate',()=>{
  loadFromURL();
  renderCategoryBar();
  render();
});
