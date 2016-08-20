import co from 'co';
/**
 * [*index description]
 *
 * @method  *index
 * @yield   {[type]}   [description]
 *
 * @author  wu.wuweiji
 * @email                            wu.wuweiji@teyide.cn
 * @create  2016-08-19
 * @update  2016-08-19
 * @version 1.1.0
 * @since   1.1.0
 */
export default function index(param) {
  return co(function * () {
    return param;
  });
}

export function getToken(param) {
  return co(function * () {
    return param;
  });
}

