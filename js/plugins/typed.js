/*
author: @jiangwen5945 & EvanNotFound
*/
export const config = {
  usrTypeSpeed: theme.home_banner.subtitle.typing_speed,
  usrBackSpeed: theme.home_banner.subtitle.backing_speed,
  usrBackDelay: theme.home_banner.subtitle.backing_delay,
  usrStartDelay: theme.home_banner.subtitle.starting_delay,
  usrLoop: theme.home_banner.subtitle.loop,
  usrSmartBackspace: theme.home_banner.subtitle.smart_backspace,
  usrHitokotoAPI: theme.home_banner.subtitle.hitokoto.api,
  usrShowCursor: theme.home_banner.subtitle.show_cursor,
};

export default function initTyped(id) {
  const {
    usrTypeSpeed,
    usrBackSpeed,
    usrBackDelay,
    usrStartDelay,
    usrLoop,
    usrSmartBackspace,
    usrHitokotoAPI,
    usrShowCursor,
  } = config;

  if (!theme.home_banner.subtitle.typed) {
    return
  }

  function typing(dataList) {
    const st = new Typed("#" + id, {
      strings: [dataList],
      typeSpeed: usrTypeSpeed || 100,
      smartBackspace: usrSmartBackspace || false,
      backSpeed: usrBackSpeed || 80,
      backDelay: usrBackDelay || 1500,
      loop: usrLoop || false,
      startDelay: usrStartDelay || 500,
      showCursor: usrShowCursor || false,
    });
  }

  if (theme.home_banner.subtitle.hitokoto.enable) {
    fetch(usrHitokotoAPI)
      .then((response) => response.json())
      .then((data) => {
        if (data.from_who && theme.home_banner.subtitle.hitokoto.show_author) {
          typing(data.hitokoto + "——" + data.from_who);
        } else {
          typing(data.hitokoto);
        }
      })
      .catch(console.error);
  } else {
    const sentenceList = [...theme.home_banner.subtitle.text];
    if (document.getElementById(id)) {
      const st = new Typed("#" + id, {
        strings: sentenceList,
        typeSpeed: usrTypeSpeed || 100,
        smartBackspace: usrSmartBackspace || false,
        backSpeed: usrBackSpeed || 80,
        backDelay: usrBackDelay || 1500,
        loop: usrLoop || false,
        startDelay: usrStartDelay || 500,
        showCursor: usrShowCursor || false,
      });
    }
  }
}
