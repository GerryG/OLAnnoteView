var $dhtml=true
var $as3=false
var $js1=true
var $swf9=false
var $swf7=false
var $profile=false
var $swf8=false
var $runtime="dhtml"
var $svg=false
var $as2=false
var $debug=false
var $j2me=false
try{
if(lzOptions){

}
}
catch(e){
lzOptions={}
}
dojo={}
dojo.flash=function(){

}
dojo.flash={flash6_version:null,flash8_version:null,ready:false,_visible:true,_isopera:navigator.userAgent.indexOf("Opera")!=-1,_issafari:navigator.appVersion.indexOf("Safari")!=-1,_isie:navigator.userAgent.indexOf("MSIE")!=-1&&!this._isopera,width:500,height:400,bgcolor:"#ffffff",wmode:"window",flashvars:"",minimumVersion:7,id:"flashObject",appenddiv:null,_loadedListeners:[],_installingListeners:[],setSwf:function($1,$2){
if($1==null){
return
}
if($1.flash6!=null){
this.flash6_version=$1.flash6
}
if($1.flash8!=null){
this.flash8_version=$1.flash8
}
if($1.width!=null){
this.width=$1.width
}
if($1.height!=null){
this.height=$1.height
}
if($1.id!=null){
this.id=$1.id
}
if($1.bgcolor!=null){
this.bgcolor=$1.bgcolor
}
if($1.wmode!=null){
this.wmode=$1.wmode
}
if($1.visible!=null){
this._visible=$1.visible
}
if($1.flashvars!=null){
this.flashvars=$1.flashvars
}
if($1.appenddiv!=null){
this.appenddiv=$1.appenddiv
}
if($2!=null){
this.minimumVersion=$2
}
this._initialize()
},useFlash6:function(){
if(this.flash6_version==null){
return false
}else{
if(this.flash6_version!=null&&dojo.flash.info.commVersion==6){
return true
}else{
return false
}
}
},useFlash8:function(){
if(this.flash8_version==null){
return false
}else{
if(this.flash8_version!=null&&dojo.flash.info.commVersion==8){
return true
}else{
return false
}
}
},addLoadedListener:function($1){
this._loadedListeners.push($1)
},addInstallingListener:function($1){
this._installingListeners.push($1)
},loaded:function(){
dojo.flash.ready=true
if(dojo.flash._loadedListeners.length>0){
for(var $1=0;$1<dojo.flash._loadedListeners.length;$1++){
dojo.flash._loadedListeners[$1].call(null)
}
}
},installing:function(){
if(dojo.flash._installingListeners.length>0){
for(var $1=0;$1<dojo.flash._installingListeners.length;$1++){
dojo.flash._installingListeners[$1].call(null)
}
}
},_initialize:function(){
var $1=(new dojo.flash.Install())
dojo.flash.installer=$1
if($1.needed()==true){
$1.install()
}else{
dojo.flash.obj=(new dojo.flash.Embed(this._visible,this.width,this.height,this.bgcolor,this.wmode,this.id,this.flashvars,this.appenddiv))
dojo.flash.obj.write(dojo.flash.info.commVersion)
dojo.flash.comm=(new dojo.flash.Communicator())
}
}}
dojo.flash.Info=function(){
if(dojo.flash._isie){
document.writeln('<script language="VBScript" type="text/vbscript">')
document.writeln("Function VBGetSwfVer(i)")
document.writeln("  on error resume next")
document.writeln("  Dim swControl, swVersion")
document.writeln("  swVersion = 0")
document.writeln('  set swControl = CreateObject("ShockwaveFlash.ShockwaveFlash." + CStr(i))')
document.writeln("  if (IsObject(swControl)) then")
document.writeln('    swVersion = swControl.GetVariable("$version")')
document.writeln("  end if")
document.writeln("  VBGetSwfVer = swVersion")
document.writeln("End Function")
document.writeln("</script>")
}
this._detectVersion()
this._detectCommunicationVersion()
}
dojo.flash.Info.prototype={version:-1,versionMajor:-1,versionMinor:-1,versionRevision:-1,capable:false,commVersion:6,installing:false,isVersionOrAbove:function($1,$2,$3){
$3=parseFloat("."+$3)
if(this.versionMajor>=$1&&this.versionMinor>=$2&&this.versionRevision>=$3){
return true
}else{
return false
}
},_detectVersion:function(){
var $1
for(var $2=25;$2>0;$2--){
if(dojo.flash._isie){
$1=VBGetSwfVer($2)
}else{
$1=this._JSFlashInfo($2)
}
if($1==-1){
this.capable=false
return
}else{
if($1!=0){
var $3
if(dojo.flash._isie){
var $4=$1.split(" ")
var $5=$4[1]
$3=$5.split(",")
}else{
$3=$1.split(".")
}
this.versionMajor=$3[0]
this.versionMinor=$3[1]
this.versionRevision=$3[2]
var $6=this.versionMajor+"."+this.versionRevision
this.version=parseFloat($6)
this.capable=true
break
}
}
}
},_JSFlashInfo:function($1){
if(navigator.plugins!=null&&navigator.plugins.length>0){
if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){
var $2=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":""
var $3=navigator.plugins["Shockwave Flash"+$2].description
var $4=$3.split(" ")
var $5=$4[2].split(".")
var $6=$5[0]
var $7=$5[1]
if($4[3]!=""){
var $8=$4[3].split("r")
}else{
var $8=$4[4].split("r")
}
var $9=$8[1]>0?$8[1]:0
var $10=$6+"."+$7+"."+$9
return $10
}
}
return -1
},_detectCommunicationVersion:function(){
if(this.capable==false){
this.commVersion=null
return
}
if(typeof lzOptions["forceFlashComm"]!="undefined"&&typeof lzOptions["forceFlashComm"]!=null){
this.commVersion=lzOptions["forceFlashComm"]
return
}
if(dojo.flash._issafari==true||dojo.flash._isopera==true){
this.commVersion=8
}else{
this.commVersion=6
}
}}
dojo.flash.Embed=function($1,$2,$3,$4,$5,$6,$7,$8){
this._visible=$1
this.width=$2?$2:215
this.height=$3?$3:138
this.bgcolor=$4?$4:"#ffffff"
this.wmode=$5?$5:"window"
this.id=$6?$6:"flashObject"
this.flashvars=$7?$7:""
this.appenddiv=$8
}
dojo.flash.Embed.prototype={width:215,height:138,bgcolor:"#ffffff",wmode:"window",flashvars:"",appenddiv:null,id:"flashObject",_visible:true,protocol:function(){
switch(window.location.protocol){
case "https:":
return "https"
break
default:
return "http"
break

}
},__getCSSValue:function($1){
if($1&&$1.length&&$1.indexOf("%")!=-1){
return "100%"
}else{
return $1+"px"
}
},write:function($1,$2){
if($2!=null){
$2=false
}
var $3=""
$3+="width: "+this.__getCSSValue(this.width)+";"
$3+="height: "+this.__getCSSValue(this.height)+";"
if(this._visible==false){
$3+="position: absolute; "
$3+="z-index: 10000; "
$3+="top: -1000px; "
$3+="left: -1000px; "
}
var $4
var $5
if($1==6){
$5=dojo.flash.flash6_version
$4='<embed id="'+this.id+'" src="'+$5+'" '+'    type="application/x-shockwave-flash" '+'    quality="high" bgcolor="'+this.bgcolor+'"'+'    width="'+this.width+'" height="'+this.height+'" '+'    name="'+this.id+'" '+'    wmode="'+this.wmode+'" '+'    FlashVars="'+this.flashvars+'"'+'    align="middle" '+'    allowScriptAccess="sameDomain" '+'    swLiveConnect="true" '+'    pluginspage="'+this.protocol()+'://www.macromedia.com/go/getflashplayer">'
}else{
$5=dojo.flash.flash8_version
var $6=this.flashvars
var $7=this.flashvars
if($2){
var $8=escape(window.location)
document.title=document.title.slice(0,47)+" - Flash Player Installation"
var $9=escape(document.title)
$6+="&MMredirectURL="+$8+"&MMplayerType=ActiveX"+"&MMdoctitle="+$9
$7+="&MMredirectURL="+$8+"&MMplayerType=PlugIn"
}
if(dojo.flash._isie){
$4='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '+'codebase="'+this.protocol()+"://fpdownload.macromedia.com/pub/shockwave/cabs/flash/"+'swflash.cab#version=8,0,0,0" '+'width="'+this.width+'" '+'height="'+this.height+'" '+'id="'+this.id+'" '+'align="middle"> '+'<param name="allowScriptAccess" value="sameDomain" /> '+'<param name="movie" value="'+$5+'" /> '+'<param name="quality" value="high" /> '+'<param name="FlashVars" value="'+$6+'" /> '+'<param name="bgcolor" value="'+this.bgcolor+'" /> '+'<param name="wmode" value="'+this.wmode+'" /> '+"</object>"
}else{
$4='<embed src="'+$5+'" '+'quality="high" '+'bgcolor="'+this.bgcolor+'" '+'wmode="'+this.wmode+'" '+'width="'+this.width+'" '+'height="'+this.height+'" '+'id="'+this.id+'" '+'name="'+this.id+'" '+'FlashVars="'+$7+'" '+'swLiveConnect="true" '+'align="middle" '+'allowScriptAccess="sameDomain" '+'type="application/x-shockwave-flash" '+'pluginspage="'+this.protocol()+'://www.macromedia.com/go/getflashplayer" />'
}
}
var $10=this.id+"Container"
var $11=this.appenddiv
if($11){
$11.innerHTML=$4
$11.setAttribute("style",$3)
}else{
$4='<div id="'+$10+'" style="'+$3+'"> '+$4+"</div>"
document.writeln($4)
}
},get:function(){
try{
var $1=document.getElementById(this.id+"")
}
catch(e){

}
return $1
},setVisible:function($1){
var $2=document.getElementById(this.id+"Container")
if($1==true){
$2.style.visibility="visible"
}else{
$2.style.position="absolute"
$2.style.x="-1000px"
$2.style.y="-1000px"
$2.style.visibility="hidden"
}
},center:function(){
var $1=this.width
var $2=this.height
var $3=0
var $4=0
var $5=document.getElementById(this.id+"Container")
$5.style.top=$4+"px"
$5.style.left=$3+"px"
}}
dojo.flash.Communicator=function(){
if(dojo.flash.useFlash6()){
this._writeFlash6()
}else{
if(dojo.flash.useFlash8()){
this._writeFlash8()
}
}
}
dojo.flash.Communicator.prototype={_writeFlash6:function(){
var $1=dojo.flash.obj.id
document.writeln('<script language="JavaScript">')
document.writeln("  function "+$1+"_DoFSCommand(command, args){ ")
document.writeln("    dojo.flash.comm._handleFSCommand(command, args); ")
document.writeln("}")
document.writeln("</script>")
if(dojo.flash._isie){
document.writeln("<SCRIPT LANGUAGE=VBScript> ")
document.writeln("on error resume next ")
document.writeln("Sub "+$1+"_FSCommand(ByVal command, ByVal args)")
document.writeln(" call "+$1+"_DoFSCommand(command, args)")
document.writeln("end sub")
document.writeln("</SCRIPT> ")
}
},_writeFlash8:function(){

},_handleFSCommand:function($1,$2){
if($1!=null&&RegExp("^FSCommand:(.*)").test($1)==true){
$1=$1.match(RegExp("^FSCommand:(.*)"))[1]
}
if($1=="addCallback"){
this._fscommandAddCallback($1,$2)
}else{
if($1=="call"){
this._fscommandCall($1,$2)
}else{
if($1=="fscommandReady"){
this._fscommandReady()
}
}
}
},_fscommandAddCallback:function($1,$2){
var functionName=$2
var $3=function(){
return dojo.flash.comm._call(functionName,arguments)
}
dojo.flash.comm[functionName]=$3
var $4=dojo.flash.obj.get()
if($4){
$4.SetVariable("_succeeded",true)
}
},_fscommandCall:function($1,$2){
var $3=dojo.flash.obj.get()
var $4=$2
if(!$3){
return
}
var $5=parseInt($3.GetVariable("_numArgs"))
var $6=[]
for(var $7=0;$7<$5;$7++){
var $8=$3.GetVariable("_"+$7)
$6.push($8)
}
var $9
if($4.indexOf(".")==-1){
$9=window[$4]
}else{
$9=eval($4)
}
var $10=null
if($9!=null){
$10=$9.apply(null,$6)
}
$10+=""
$3.SetVariable("_returnResult",$10)
},_fscommandReady:function(){
var $1=dojo.flash.obj.get()
if($1){
$1.SetVariable("fscommandReady","true")
}
},_call:function($1,$2){
var $3=dojo.flash.obj.get()
$3.SetVariable("_functionName",$1)
$3.SetVariable("_numArgs",$2.length)
for(var $4=0;$4<$2.length;$4++){
var $5=$2[$4]
$5=$5.replace(RegExp("\\0","g"),"\\0")
$3.SetVariable("_"+$4,$5)
}
$3.TCallFrame("/flashRunner",1)
var $6=$3.GetVariable("_returnResult")
$6=$6.replace(RegExp("\\\\0","g"),"\0")
return $6
},_addExternalInterfaceCallback:function(methodName){
var $1=function(){
var $1=[]
for(var $2=0;$2<arguments.length;$2++){
$1[$2]=arguments[$2]
}
$1.length=arguments.length
return dojo.flash.comm._execFlash(methodName,$1)
}
dojo.flash.comm[methodName]=$1
},_encodeData:function($1){
var $2=RegExp("\\&([^;]*)\\;","g")
$1=$1.replace($2,"&amp;$1;")
$1=$1.replace(RegExp("<","g"),"&lt;")
$1=$1.replace(RegExp(">","g"),"&gt;")
$1=$1.replace("\\","&custom_backslash;&custom_backslash;")
$1=$1.replace(RegExp("\\n","g"),"\\n")
$1=$1.replace(RegExp("\\r","g"),"\\r")
$1=$1.replace(RegExp("\\f","g"),"\\f")
$1=$1.replace(RegExp("\\0","g"),"\\0")
$1=$1.replace(RegExp("\\'","g"),"\\'")
$1=$1.replace(RegExp('\\"',"g"),'\\"')
return $1
},_decodeData:function($1){
if($1==null||typeof $1=="undefined"){
return $1
}
$1=$1.replace(RegExp("\\&custom_lt\\;","g"),"<")
$1=$1.replace(RegExp("\\&custom_gt\\;","g"),">")
$1=eval('"'+$1+'"')
return $1
},_chunkArgumentData:function($1,$2){
var $3=dojo.flash.obj.get()
var $4=Math.ceil($1.length/1024)
for(var $5=0;$5<$4;$5++){
var $6=$5*1024
var $7=$5*1024+1024
if($5==$4-1){
$7=$5*1024+$1.length
}
var $8=$1.substring($6,$7)
$8=this._encodeData($8)
$3.CallFunction('<invoke name="chunkArgumentData" '+'returntype="javascript">'+"<arguments>"+"<string>"+$8+"</string>"+"<number>"+$2+"</number>"+"</arguments>"+"</invoke>")
}
},_chunkReturnData:function(){
var $1=dojo.flash.obj.get()
var $2=$1.getReturnLength()
var $3=[]
for(var $4=0;$4<$2;$4++){
var $5=$1.CallFunction('<invoke name="chunkReturnData" '+'returntype="javascript">'+"<arguments>"+"<number>"+$4+"</number>"+"</arguments>"+"</invoke>")
if($5=='""'||$5=="''"){
$5=""
}else{
$5=$5.substring(1,$5.length-1)
}
$3.push($5)
}
var $6=$3.join("")
return $6
},_execFlash:function($1,$2){
var $3=dojo.flash.obj.get()
$3.startExec()
$3.setNumberArguments($2.length)
for(var $4=0;$4<$2.length;$4++){
this._chunkArgumentData($2[$4],$4)
}
$3.exec($1)
var $5=this._chunkReturnData()
$5=this._decodeData($5)
$3.endExec()
return $5
}}
dojo.flash.Install=function(){

}
dojo.flash.Install.prototype={needed:function(){
if(dojo.flash.info.capable==false){
return true
}
if(dojo.flash._issafari==true&&!dojo.flash.info.isVersionOrAbove(8,0,0)){
return true
}
if(dojo.flash.minimumVersion>dojo.flash.info.versionMajor){
return true
}
if(!dojo.flash.info.isVersionOrAbove(6,0,0)){
return true
}
return false
},install:function(){
dojo.flash.info.installing=true
dojo.flash.installing()
if(dojo.flash.info.capable==false){
var $1=(new dojo.flash.Embed(false))
$1.write(8)
}else{
if(dojo.flash.info.isVersionOrAbove(6,0,65)){
var $1=(new dojo.flash.Embed(false))
$1.write(8,true)
$1.setVisible(true)
$1.center()
}else{
alert("This content requires a more recent version of the Macromedia "+" Flash Player.")
window.location.href=+dojo.flash.Embed.protocol()+"://www.macromedia.com/go/getflashplayer"
}
}
},_onInstallStatus:function($1){
if($1=="Download.Complete"){
dojo.flash._initialize()
}else{
if($1=="Download.Cancelled"){
alert("This content requires a more recent version of the Macromedia "+" Flash Player.")
window.location.href=dojo.flash.Embed.protocol()+"://www.macromedia.com/go/getflashplayer"
}else{
if($1=="Download.Failed"){
alert("There was an error downloading the Flash Player update. "+"Please try again later, or visit macromedia.com to download "+"the latest version of the Flash plugin.")
}
}
}
}}
dojo.flash.info=(new dojo.flash.Info())
Lz={__dhtmlhistoryready:false,swfEmbed:function($1,$2){
if($2==null){
$2=7
}
var $3=$1.url
var $4=$3.indexOf("lzr=swf")
if($4==-1){
$3+="&lzr=swf7"
$4=$3.indexOf("lzr=swf")
}
$4+=7
var $5=$3.substring($4,$4+1)*1
if(dojo.flash.info.commVersion>$5){
$3=$3.substring(0,$4)+dojo.flash.info.commVersion+$3.substring($4+1,$3.length)
$2=dojo.flash.info.commVersion
}else{
if(dojo.flash.info.commVersion<=7&&$5>7){
dojo.flash.info.commVersion=8
}
}
if($5>$2){
$2=$5
}
var $6=this.__getqueryurl($3)
if($1.accessible=="true"){
$6.flashvars+="&accessible=true"
}
var $3=$6.url+"?"+$6.query
var $7={width:$1.width+"",height:$1.height+"",id:$1.id,bgcolor:$1.bgcolor,wmode:$1.wmode,flashvars:$6.flashvars,flash6:$3,flash8:$3,appenddiv:Lz._getAppendDiv($1.id,$1.appenddivid)}
dojo.flash.setSwf($7,$2)
},dhtmlEmbedLFC:function($1,$2){
if($2){
this.supportedBrowser=true
Lz.__BrowserDetect.init()
}else{
if(!this.__isSupportedBrowser($2===false)){
document.write('<div style="margin: 5%; width: auto; background-color: #fff; padding: 1em; overflow: visible"><div><a href="http://www.openlaszlo.org/" target="_top"><img src="http://openlaszlo.org/themes/manji/images/ol_logo_small.gif" height="46" width="204" alt="OpenLaszlo" ></a></div><p>The OpenLaszlo DHTML runtime is not fully supported on this browser.  More information is available <a href="http://www.openlaszlo.org/" target="_top">here</a>.</p></div>')
return
}
}
var $3=Lz.__BrowserDetect.browser=="Explorer"&&Lz.__BrowserDetect.browser!="Netscape"
if($3){
var $4=lzOptions.ServerRoot+"/lps/includes/excanvas.js"
this.__dhtmlLoadScript($4)
}
this.__dhtmlLoadScript($1)
},dhtmlEmbed:function($1,$2){
if($2){

}else{
if(!this.supportedBrowser){
return
}
}
var $3=this.__getqueryurl($1.url,true)
var $4=$3.url+"?lzt=object&"+$3.query
Lz.__propcache={bgcolor:$1.bgcolor,width:$1.width.indexOf("%")==-1?$1.width+"px":"100%",height:$1.height.indexOf("%")==-1?$1.height+"px":"100%",id:$1.id,appenddiv:Lz._getAppendDiv($1.id,$1.appenddivid),url:$4}
this.__dhtmlLoadScript($4)
},__dhtmlLoadScript:function($1){
var $2='<script type="text/javascript" language="JavaScript1.5" src="'+$1+'"></script>'
document.write($2)
return $2
},__getqueryurl:function($1,$2){
var $3=$1.split("?")
$1=$3[0]
if($3.length==1){
return {url:$1,flashvars:"",query:""}
}
var $4=this.__parseQuery($3[1])
var $5=""
var $6=""
var $7=(new RegExp("\\+","g"))
for(var $8 in $4){
if($8==""||$8==null){
continue
}
var $9=$4[$8]
if($8=="lzr"||$8=="lzt"||$8=="krank"||$8=="debug"||$8=="profile"||$8=="lzdebug"||$8=="lzkrank"||$8=="lzprofile"||$8=="fb"||$8=="sourcelocators"||$8=="_canvas_debug"){
$5+=$8+"="+$9+"&"
}
if($2){
if(window[$8]==null){
window[$8]=unescape($9.replace($7," "))
}
}
$6+=$8+"="+$9+"&"
}
$5=$5.substr(0,$5.length-1)
$6=$6.substr(0,$6.length-1)
return {url:$1,flashvars:$6,query:$5}
},__parseQuery:function($1){
if($1.indexOf("=")==-1){
return
}
var $2=$1.split("&")
var $3={}
for(i in $2){
var $4=$2[i].split("=")
if($4.length==1){
continue
}
var $5=$4[0]
var $6=$4[1]
$3[$5]=$6
}
return $3
},__isSupportedBrowser:function($1){
if(this.hasOwnProperty("supportedBrowser")){
return this.supportedBrowser
}
Lz.__BrowserDetect.init()
var $2=Lz.__BrowserDetect.browser=="Netscape"
var $3=Lz.__BrowserDetect.browser=="Safari"
var $4=Lz.__BrowserDetect.browser=="Opera"
var $5=Lz.__BrowserDetect.browser=="Firefox"
var $6=Lz.__BrowserDetect.browser=="Explorer"&&!($2||$3||$4||$5)
var $7=$5&&Lz.__BrowserDetect.version>=1.5||$6&&Lz.__BrowserDetect.version>=6||$3&&Lz.__BrowserDetect.version>=418.9
if($7){
this.supportedBrowser=true
}else{
if($1){
this.supportedBrowser=false
}else{
this.supportedBrowser=confirm("The OpenLaszlo DHTML runtime is not fully supported on this browser.  Click OK to try it anyway.  [ Detected browser "+Lz.__BrowserDetect.browser+" version "+Lz.__BrowserDetect.version+"]")
}
}
return this.supportedBrowser
},setCanvasAttribute:function($1,$2,$3){
if(dojo.flash.ready){
if($3){
if($1 instanceof Array){
var $4=""
for(var $5=0;$5<$1.length;$5=$5+2){
$4+=escape($1[$5])+"="+escape($1[$5+1])+""
if($5<$1.length-2){
$4+=","
}
}
}else{
var $4=escape($1)+"="+escape($2)+""
}
window.top.location.hash="_lz"+$4
}else{
dojo.flash.comm.setCanvasAttribute($1,$2+"")
}
}else{
if(this._setCanvasAttributeQ==null){
this._setCanvasAttributeQ=[[$1,$2,$3]]
}else{
this._setCanvasAttributeQ.push([$1,$2,$3])
}
dojo.flash.addLoadedListener(Lz._loaded)
}
},_loaded:function(){
if(dojo.flash.info.commVersion==8){
setTimeout("Lz._setCanvasAttributeDequeue()",100)
}else{
Lz._setCanvasAttributeDequeue()
}
},_setCanvasAttributeDequeue:function(){
while(Lz._setCanvasAttributeQ.length>0){
var $1=Lz._setCanvasAttributeQ.pop()
Lz.setCanvasAttribute($1[0],$1[1],$1[2])
}
},getCanvasAttribute:function($1){
if(dojo.flash.ready){
return dojo.flash.comm.getCanvasAttribute($1)
}else{
alert("dojo.flash is not ready: getCanvasAttribute"+$1)
}
},__BrowserDetect:{init:function(){
if(this.initted){
return
}
this.browser=this.searchString(this.dataBrowser)||"An unknown browser"
this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version"
this.OS=this.searchString(this.dataOS)||"an unknown OS"
this.initted=true
},searchString:function($1){
for(var $2=0;$2<$1.length;$2++){
var $3=$1[$2].string
var $4=$1[$2].prop
this.versionSearchString=$1[$2].versionSearch||$1[$2].identity
if($3){
if($3.indexOf($1[$2].subString)!=-1){
return $1[$2].identity
}
}else{
if($4){
return $1[$2].identity
}
}
}
},searchVersion:function($1){
var $2=$1.indexOf(this.versionSearchString)
if($2==-1){
return
}
return parseFloat($1.substring($2+this.versionSearchString.length+1))
},dataBrowser:[{string:navigator.userAgent,subString:"Apple",identity:"Safari",versionSearch:"WebKit"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]},callMethod:function($1){
if(dojo.flash.comm){
return dojo.flash.comm.callMethod($1)
}
},_historyEvent:function($1){
if(dojo.flash.ready){
dojo.flash.comm.receiveHistory($1+"")
return true
}else{

}
},_checklocationhash:function(){
var $1=window.top.location.hash
if($1!=this.__lasthash&&$1.length>1){
if($1.indexOf("_lz")!=-1){
this.__lasthash=$1
$1=$1.substring(4)
var $2=$1.split(",")
for(var $3=0;$3<$2.length;$3++){
var $4=$2[$3]
var $5=$4.indexOf("=")
var $6=unescape($4.substring(0,$5))
var $7=unescape($4.substring($5+1))
this.setCanvasAttribute($6,$7)
if(Lz.__dhtmlhistoryready){
canvas.setAttribute($6,$7)
}
}
}else{
var $8=$1.substring(1)
if(Lz._historyEvent($8)){
Lz.__lasthash=$1
}
if(Lz.__dhtmlhistoryready){
LzHistory.receiveHistory($8+"")
Lz.__lasthash=$1
}
}
}
},_callHistoryEvent:function($1,$2){

},_setHash:function($1){
window.top.location.hash=$1
},_getAppendDiv:function($1,$2){
var $3=$2?$2:$1+"Container"
var $4=document.getElementById($3)
if(!$4){
document.writeln('<div id="'+$3+'"></div>')
$4=document.getElementById($3)
}
return $4
}}
window.setInterval("Lz._checklocationhash()",300)
Lz.iframemanager={__highestz:0,__frames:{},create:function($1,$2,$3){
var $4=document.createElement("iframe")
$4.owner=$1
$4.skiponload=true
var $5="__lz"+Lz.iframemanager.__highestz++
Lz.iframemanager.__frames[$5]=$4
$4.setAttribute("id",$5)
if($2==null){
$2=""
}
if($2!=""){
$4.setAttribute("name",$2)
}
$4.__gotload=Lz.iframemanager.__gotload
$4.setAttribute("onload",'Lz.iframemanager.__gotload("'+$5+'")')
if($3==null||$3=="undefined"){
$3=document.body
}
$3.appendChild($4)
var $6=Lz.iframemanager.getFrame($5)
if(document.getElementById&&!document.all){
$6.style.border="0"
}else{
if(document.all){
$6.setAttribute("frameborder","0")
$6.setAttribute("allowtransparency","true")
}
}
$6.style.position="absolute"
return $5
},getFrame:function($1){
return Lz.iframemanager.__frames[$1]
},setSrc:function($1,$2){
var $3=Lz.iframemanager.getFrame($1)
$3.setAttribute("src",$2)
return true
},setPosition:function($1,$2,$3,$4,$5,$6){
var $7=Lz.iframemanager.getFrame($1)
if($2!=null){
$7.style.left=$2+"px"
}
if($3!=null){
$7.style.top=$3+"px"
}
if($4!=null){
$7.style.width=$4+"px"
}
if($5!=null){
$7.style.height=$5+"px"
}
if($6!=null){
$7.style.display=$6?"block":"none"
}
return true
},setVisible:function($1,$2){
var $3=Lz.iframemanager.getFrame($1)
$3.style.display=$2?"block":"none"
return true
},bringToFront:function($1){
var $2=Lz.iframemanager.getFrame($1)
$2.style.zIndex=100000+Lz.iframemanager.__highestz
return true
},__gotload:function($1){
var $2=Lz.iframemanager.getFrame($1)
if($2.skiponload){
$2.skiponload=false
return
}
if($2.owner&&$2.owner.__gotload){
$2.owner.__gotload()
}else{
Lz.callMethod("Lz.iframemanager.__gotload('"+$1+"')")
}
}}
