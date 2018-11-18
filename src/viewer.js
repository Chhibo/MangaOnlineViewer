import {
  getBrowser,
  getEngine,
  getInfoGM,
  logScript,
  logScriptC,
} from './browser';
import {
  settings,
} from './settings';
import reader from './reader';
import {
  loadManga,
  checkImagesLoaded,
} from './page';
import {
  controls,
  setKeyDownEvents,
} from './events';
import {
  isEmpty,
} from './utils';

// Organize the site adding place holders for the manga pages
function formatPage(manga, begin = 0) {
  logScript(`Found ${manga.quant} pages`);
  if (manga.quant > 0) {
    settings.starting = begin || settings.bookmarks// [manga.name]
      .filter(x => x.url === location.href)
      .map(x => x.page)[0] || 0;
    let cancel = false;
    if (!settings.alwaysLoad) {
      $('head')
        .append(
          '<style type="text/css">.sweet-alert,.sweet-overlay{position:fixed;display:none}body.stop-scrolling{height:100%;overflow:hidden}.sweet-overlay{background-color:#000;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=40)";background-color:rgba(0,0,0,.4);left:0;right:0;top:0;bottom:0;z-index:10000}.sweet-alert{background-color:#fff;font-family:"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif;width:478px;padding:17px;border-radius:5px;text-align:center;left:50%;top:50%;margin-left:-256px;margin-top:-200px;overflow:hidden;z-index:99999}@media all and (max-width:540px){.sweet-alert{width:auto;margin-left:0;margin-right:0;left:15px;right:15px}}.sweet-alert h2{color:#575757;font-size:30px;text-align:center;font-weight:600;text-transform:none;position:relative;margin:25px 0;padding:0;line-height:40px;display:block}.sweet-alert p{color:#797979;font-size:16px;font-weight:300;position:relative;text-align:inherit;float:none;margin:0;padding:0;line-height:normal}.sweet-alert fieldset{border:none;position:relative}.sweet-alert .sa-error-container{background-color:#f1f1f1;margin-left:-17px;margin-right:-17px;overflow:hidden;padding:0 10px;max-height:0;webkit-transition:padding .15s,max-height .15s;transition:padding .15s,max-height .15s}.sweet-alert .sa-error-container.show{padding:10px 0;max-height:100px;webkit-transition:padding .2s,max-height .2s;transition:padding .25s,max-height .25s}.sweet-alert .sa-error-container .icon{display:inline-block;width:24px;height:24px;border-radius:50%;background-color:#ea7d7d;color:#fff;line-height:24px;text-align:center;margin-right:3px}.sweet-alert .sa-error-container p{display:inline-block}.sweet-alert .sa-input-error{position:absolute;top:29px;right:26px;width:20px;height:20px;opacity:0;-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transition:all .1s;transition:all .1s}.sweet-alert .sa-input-error::after,.sweet-alert .sa-input-error::before{content:"";width:20px;height:6px;background-color:#f06e57;border-radius:3px;position:absolute;top:50%;margin-top:-4px;left:50%;margin-left:-9px}.sweet-alert .sa-input-error::before{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.sweet-alert .sa-input-error::after{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.sweet-alert .sa-input-error.show{opacity:1;-webkit-transform:scale(1);transform:scale(1)}.sweet-alert input{width:100%;box-sizing:border-box;border-radius:3px;border:1px solid #d7d7d7;height:43px;margin-top:10px;margin-bottom:17px;font-size:18px;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);padding:0 12px;display:none;-webkit-transition:all .3s;transition:all .3s}.sweet-alert input:focus{outline:0;box-shadow:0 0 3px #c4e6f5;border:1px solid #b4dbed}.sweet-alert input:focus::-moz-placeholder{transition:opacity .3s 30ms ease;opacity:.5}.sweet-alert input:focus:-ms-input-placeholder{transition:opacity .3s 30ms ease;opacity:.5}.sweet-alert input:focus::-webkit-input-placeholder{transition:opacity .3s 30ms ease;opacity:.5}.sweet-alert input::-moz-placeholder{color:#bdbdbd}.sweet-alert input::-ms-clear{display:none}.sweet-alert input:-ms-input-placeholder{color:#bdbdbd}.sweet-alert input::-webkit-input-placeholder{color:#bdbdbd}.sweet-alert.show-input input{display:block}.sweet-alert .sa-confirm-button-container{display:inline-block;position:relative}.sweet-alert .la-ball-fall{position:absolute;left:50%;top:50%;margin-left:-27px;margin-top:4px;opacity:0;visibility:hidden}.sweet-alert button{background-color:#8CD4F5;color:#fff;border:none;box-shadow:none;font-size:17px;font-weight:500;-webkit-border-radius:4px;border-radius:5px;padding:10px 32px;margin:26px 5px 0;cursor:pointer}.sweet-alert button:focus{outline:0;box-shadow:0 0 2px rgba(128,179,235,.5),inset 0 0 0 1px rgba(0,0,0,.05)}.sweet-alert button:hover{background-color:#7ecff4}.sweet-alert button:active{background-color:#5dc2f1}.sweet-alert button.cancel{background-color:#C1C1C1}.sweet-alert button.cancel:hover{background-color:#b9b9b9}.sweet-alert button.cancel:active{background-color:#a8a8a8}.sweet-alert button.cancel:focus{box-shadow:rgba(197,205,211,.8) 0 0 2px,rgba(0,0,0,.0470588) 0 0 0 1px inset!important}.sweet-alert button[disabled]{opacity:.6;cursor:default}.sweet-alert button.confirm[disabled]{color:transparent}.sweet-alert button.confirm[disabled]~.la-ball-fall{opacity:1;visibility:visible;transition-delay:0s}.sweet-alert button::-moz-focus-inner{border:0}.sweet-alert[data-has-cancel-button=false] button{box-shadow:none!important}.sweet-alert[data-has-confirm-button=false][data-has-cancel-button=false]{padding-bottom:40px}.sweet-alert .sa-icon{width:80px;height:80px;border:4px solid gray;-webkit-border-radius:40px;border-radius:50%;margin:20px auto;padding:0;position:relative;box-sizing:content-box}.sweet-alert .sa-icon.sa-error{border-color:#F27474}.sweet-alert .sa-icon.sa-error .sa-x-mark{position:relative;display:block}.sweet-alert .sa-icon.sa-error .sa-line{position:absolute;height:5px;width:47px;background-color:#F27474;display:block;top:37px;border-radius:2px}.sweet-alert .sa-icon.sa-error .sa-line.sa-left{-webkit-transform:rotate(45deg);transform:rotate(45deg);left:17px}.sweet-alert .sa-icon.sa-error .sa-line.sa-right{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:16px}.sweet-alert .sa-icon.sa-warning{border-color:#F8BB86}.sweet-alert .sa-icon.sa-warning .sa-body{position:absolute;width:5px;height:47px;left:50%;top:10px;-webkit-border-radius:2px;border-radius:2px;margin-left:-2px;background-color:#F8BB86}.sweet-alert .sa-icon.sa-warning .sa-dot{position:absolute;width:7px;height:7px;-webkit-border-radius:50%;border-radius:50%;margin-left:-3px;left:50%;bottom:10px;background-color:#F8BB86}.sweet-alert .sa-icon.sa-info::after,.sweet-alert .sa-icon.sa-info::before{content:"";background-color:#C9DAE1;left:50%;position:absolute}.sweet-alert .sa-icon.sa-info{border-color:#C9DAE1}.sweet-alert .sa-icon.sa-info::before{width:5px;height:29px;bottom:17px;border-radius:2px;margin-left:-2px}.sweet-alert .sa-icon.sa-info::after{width:7px;height:7px;border-radius:50%;margin-left:-3px;top:19px}.sweet-alert .sa-icon.sa-success{border-color:#A5DC86}.sweet-alert .sa-icon.sa-success::after,.sweet-alert .sa-icon.sa-success::before{content:"";position:absolute;width:60px;height:120px;background:#fff}.sweet-alert .sa-icon.sa-success::before{-webkit-border-radius:120px 0 0 120px;border-radius:120px 0 0 120px;top:-7px;left:-33px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:60px 60px;transform-origin:60px 60px}.sweet-alert .sa-icon.sa-success::after{-webkit-border-radius:0 120px 120px 0;border-radius:0 120px 120px 0;top:-11px;left:30px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 60px;transform-origin:0 60px}.sweet-alert .sa-icon.sa-success .sa-placeholder{width:80px;height:80px;border:4px solid rgba(165,220,134,.2);-webkit-border-radius:40px;border-radius:50%;box-sizing:content-box;position:absolute;left:-4px;top:-4px;z-index:2}.sweet-alert .sa-icon.sa-success .sa-fix{width:5px;height:90px;background-color:#fff;position:absolute;left:28px;top:8px;z-index:1;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.sweet-alert .sa-icon.sa-success .sa-line{height:5px;background-color:#A5DC86;display:block;border-radius:2px;position:absolute;z-index:2}.sweet-alert .sa-icon.sa-success .sa-line.sa-tip{width:25px;left:14px;top:46px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.sweet-alert .sa-icon.sa-success .sa-line.sa-long{width:47px;right:8px;top:38px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.sweet-alert .sa-icon.sa-custom{background-size:contain;border-radius:0;border:none;background-position:center center;background-repeat:no-repeat}@-webkit-keyframes showSweetAlert{0%{transform:scale(.7);-webkit-transform:scale(.7)}45%{transform:scale(1.05);-webkit-transform:scale(1.05)}80%{transform:scale(.95);-webkit-transform:scale(.95)}100%{transform:scale(1);-webkit-transform:scale(1)}}@keyframes showSweetAlert{0%{transform:scale(.7);-webkit-transform:scale(.7)}45%{transform:scale(1.05);-webkit-transform:scale(1.05)}80%{transform:scale(.95);-webkit-transform:scale(.95)}100%{transform:scale(1);-webkit-transform:scale(1)}}@-webkit-keyframes hideSweetAlert{0%{transform:scale(1);-webkit-transform:scale(1)}100%{transform:scale(.5);-webkit-transform:scale(.5)}}@keyframes hideSweetAlert{0%{transform:scale(1);-webkit-transform:scale(1)}100%{transform:scale(.5);-webkit-transform:scale(.5)}}@-webkit-keyframes slideFromTop{0%{top:0}100%{top:50%}}@keyframes slideFromTop{0%{top:0}100%{top:50%}}@-webkit-keyframes slideToTop{0%{top:50%}100%{top:0}}@keyframes slideToTop{0%{top:50%}100%{top:0}}@-webkit-keyframes slideFromBottom{0%{top:70%}100%{top:50%}}@keyframes slideFromBottom{0%{top:70%}100%{top:50%}}@-webkit-keyframes slideToBottom{0%{top:50%}100%{top:70%}}@keyframes slideToBottom{0%{top:50%}100%{top:70%}}.showSweetAlert[data-animation=pop]{-webkit-animation:showSweetAlert .3s;animation:showSweetAlert .3s}.showSweetAlert[data-animation=none]{-webkit-animation:none;animation:none}.showSweetAlert[data-animation=slide-from-top]{-webkit-animation:slideFromTop .3s;animation:slideFromTop .3s}.showSweetAlert[data-animation=slide-from-bottom]{-webkit-animation:slideFromBottom .3s;animation:slideFromBottom .3s}.hideSweetAlert[data-animation=pop]{-webkit-animation:hideSweetAlert .2s;animation:hideSweetAlert .2s}.hideSweetAlert[data-animation=none]{-webkit-animation:none;animation:none}.hideSweetAlert[data-animation=slide-from-top]{-webkit-animation:slideToTop .4s;animation:slideToTop .4s}.hideSweetAlert[data-animation=slide-from-bottom]{-webkit-animation:slideToBottom .3s;animation:slideToBottom .3s}@-webkit-keyframes animateSuccessTip{0%,54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}100%{width:25px;left:14px;top:45px}}@keyframes animateSuccessTip{0%,54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}100%{width:25px;left:14px;top:45px}}@-webkit-keyframes animateSuccessLong{0%,65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}100%{width:47px;right:8px;top:38px}}@keyframes animateSuccessLong{0%,65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}100%{width:47px;right:8px;top:38px}}@-webkit-keyframes rotatePlaceholder{0%,5%{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}100%,12%{transform:rotate(-405deg);-webkit-transform:rotate(-405deg)}}@keyframes rotatePlaceholder{0%,5%{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}100%,12%{transform:rotate(-405deg);-webkit-transform:rotate(-405deg)}}.animateSuccessTip{-webkit-animation:animateSuccessTip .75s;animation:animateSuccessTip .75s}.animateSuccessLong{-webkit-animation:animateSuccessLong .75s;animation:animateSuccessLong .75s}.sa-icon.sa-success.animate::after{-webkit-animation:rotatePlaceholder 4.25s ease-in;animation:rotatePlaceholder 4.25s ease-in}@-webkit-keyframes animateErrorIcon{0%{transform:rotateX(100deg);-webkit-transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);-webkit-transform:rotateX(0);opacity:1}}@keyframes animateErrorIcon{0%{transform:rotateX(100deg);-webkit-transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);-webkit-transform:rotateX(0);opacity:1}}.animateErrorIcon{-webkit-animation:animateErrorIcon .5s;animation:animateErrorIcon .5s}@-webkit-keyframes animateXMark{0%,50%{transform:scale(.4);-webkit-transform:scale(.4);margin-top:26px;opacity:0}80%{transform:scale(1.15);-webkit-transform:scale(1.15);margin-top:-6px}100%{transform:scale(1);-webkit-transform:scale(1);margin-top:0;opacity:1}}@keyframes animateXMark{0%,50%{transform:scale(.4);-webkit-transform:scale(.4);margin-top:26px;opacity:0}80%{transform:scale(1.15);-webkit-transform:scale(1.15);margin-top:-6px}100%{transform:scale(1);-webkit-transform:scale(1);margin-top:0;opacity:1}}.animateXMark{-webkit-animation:animateXMark .5s;animation:animateXMark .5s}@-webkit-keyframes pulseWarning{0%{border-color:#F8D486}100%{border-color:#F8BB86}}@keyframes pulseWarning{0%{border-color:#F8D486}100%{border-color:#F8BB86}}.pulseWarning{-webkit-animation:pulseWarning .75s infinite alternate;animation:pulseWarning .75s infinite alternate}@-webkit-keyframes pulseWarningIns{0%{background-color:#F8D486}100%{background-color:#F8BB86}}@keyframes pulseWarningIns{0%{background-color:#F8D486}100%{background-color:#F8BB86}}.pulseWarningIns{-webkit-animation:pulseWarningIns .75s infinite alternate;animation:pulseWarningIns .75s infinite alternate}@-webkit-keyframes rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.sweet-alert .sa-icon.sa-error .sa-line.sa-left{-ms-transform:rotate(45deg)}.sweet-alert .sa-icon.sa-error .sa-line.sa-right{-ms-transform:rotate(-45deg)}.sweet-alert .sa-icon.sa-success{border-color:transparent}.sweet-alert .sa-icon.sa-success .sa-line.sa-tip{-ms-transform:rotate(45deg)}.sweet-alert .sa-icon.sa-success .sa-line.sa-long{-ms-transform:rotate(-45deg)}.la-ball-fall,.la-ball-fall>div{position:relative;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.la-ball-fall{display:block;font-size:0;color:#fff;width:54px;height:18px}.la-ball-fall.la-dark{color:#333}.la-ball-fall>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:4px;border-radius:100%;opacity:0;-webkit-animation:ball-fall 1s ease-in-out infinite;-moz-animation:ball-fall 1s ease-in-out infinite;-o-animation:ball-fall 1s ease-in-out infinite;animation:ball-fall 1s ease-in-out infinite}.la-ball-fall>div:nth-child(1){-webkit-animation-delay:-.2s;-moz-animation-delay:-.2s;-o-animation-delay:-.2s;animation-delay:-.2s}.la-ball-fall>div:nth-child(2){-webkit-animation-delay:-.1s;-moz-animation-delay:-.1s;-o-animation-delay:-.1s;animation-delay:-.1s}.la-ball-fall>div:nth-child(3){-webkit-animation-delay:0s;-moz-animation-delay:0s;-o-animation-delay:0s;animation-delay:0s}.la-ball-fall.la-sm{width:26px;height:8px}.la-ball-fall.la-sm>div{width:4px;height:4px;margin:2px}.la-ball-fall.la-2x{width:108px;height:36px}.la-ball-fall.la-2x>div{width:20px;height:20px;margin:8px}.la-ball-fall.la-3x{width:162px;height:54px}.la-ball-fall.la-3x>div{width:30px;height:30px;margin:12px}@-webkit-keyframes ball-fall{0%{opacity:0;-webkit-transform:translateY(-145%);transform:translateY(-145%)}10%,90%{opacity:.5}20%,80%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}100%{opacity:0;-webkit-transform:translateY(145%);transform:translateY(145%)}}@-moz-keyframes ball-fall{0%{opacity:0;-moz-transform:translateY(-145%);transform:translateY(-145%)}10%,90%{opacity:.5}20%,80%{opacity:1;-moz-transform:translateY(0);transform:translateY(0)}100%{opacity:0;-moz-transform:translateY(145%);transform:translateY(145%)}}@-o-keyframes ball-fall{0%{opacity:0;-o-transform:translateY(-145%);transform:translateY(-145%)}10%,90%{opacity:.5}20%,80%{opacity:1;-o-transform:translateY(0);transform:translateY(0)}100%{opacity:0;-o-transform:translateY(145%);transform:translateY(145%)}}@keyframes ball-fall{0%{opacity:0;-webkit-transform:translateY(-145%);-moz-transform:translateY(-145%);-o-transform:translateY(-145%);transform:translateY(-145%)}10%,90%{opacity:.5}20%,80%{opacity:1;-webkit-transform:translateY(0);-moz-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}100%{opacity:0;-webkit-transform:translateY(145%);-moz-transform:translateY(145%);-o-transform:translateY(145%);transform:translateY(145%)}}</style>');
      swal({
        title: 'Starting MangaOnlineViewer',
        text: `${settings.starting
        > 1 ? `Resuming reading from Page ${settings.starting}.\n` : ''}Please wait, 3 seconds...`,
        showCancelButton: false,
        confirmButtonText: 'No, cancel!',
        confirmButtonColor: '#DD6B55',
        closeOnConfirm: true,
      }).then((isConfirm) => {
        cancel = isConfirm;
        W.mov = starting => formatPage(manga, starting);
      });
    }
    setTimeout(() => {
      W.stop();
      if (cancel) {
        logScript('Aborted');
        return;
      }
      if (manga.before !== undefined) {
        manga.before();
      }
      document.documentElement.innerHTML = reader(manga, settings.starting);
      setTimeout(() => {
        try {
          controls(manga);
          setKeyDownEvents(manga);
          checkImagesLoaded(manga);
          logScript('Site rebuild done');
          setTimeout(() => {
            $('body').scrollTo(0);
            loadManga(manga, settings.starting);
          }, 50);
        } catch (e) {
          logScript(e);
        }
      }, 50);
      if (manga.after !== undefined) {
        manga.after();
      }
    }, settings.alwaysLoad ? 50 : 3000);
  }
}

// Script Entry point
function start(sites) {
  logScript(
    `Starting ${getInfoGM.script.name} ${getInfoGM.script.version} on ${getBrowser()} with ${getEngine()}`);
  W.InfoGM = getInfoGM;
  logScript(`${sites.length} Known Manga Sites`);
  let waitElapsed = 0;

  // Wait for something on the site to be ready before executing the script
  function waitExec(site) {
    let wait = '';
    if (site.waitMax !== undefined) {
      if (waitElapsed >= site.waitMax) {
        formatPage(site.run());
        return;
      }
    }
    if (site.waitAttr !== undefined) {
      wait = $(site.waitAttr[0]).attr(site.waitAttr[1]);
      logScript(`Wating for ${site.waitAttr[1]} of ${site.waitAttr[0]} = ${wait}`);
      if (wait === undefined || isEmpty(wait)) {
        setTimeout(() => {
          waitExec(site);
        }, site.waitStep || 1000);
        waitElapsed += site.waitStep || 1000;
        return;
      }
    }
    if (site.waitEle !== undefined) {
      wait = $(site.waitEle).get();
      const t = wait.map(w => $(w).text()).join('');
      logScript(`Wating for ${site.waitEle} = ${`${wait} ${t}`}`);
      if (wait === undefined || isEmpty(wait) || t === '' || t === '0') {
        setTimeout(() => {
          waitExec(site);
        }, site.waitStep || 1000);
        waitElapsed += site.waitStep || 1000;
        return;
      }
    }
    if (site.waitVar !== undefined) {
      wait = W[site.waitVar];
      logScript(`Wating for ${site.waitVar} = ${wait}`);
      if (isEmpty(wait)) {
        setTimeout(() => {
          waitExec(site);
        }, site.waitStep || 1000);
        waitElapsed += site.waitStep || 1000;
        return;
      }
    }
    formatPage(site.run());
  }

  logScript('Looking for a match...');
  const test = R.compose(R.map(waitExec),
    R.map(logScriptC('Site Found:')),
    R.filter(x => R.test(x.url, location.href)));
  test(sites);
}

// eslint-disable-next-line import/prefer-default-export
export { start };
