/**
 * @获取token
 */
export function getAuthorityToken() {
  return sessionStorage.getItem('vue-erek-token')
}
/**
 * @设置token
 */
export function setAuthorityToken(vueToken) {
  return sessionStorage.setItem('vue-erek-token', vueToken)
}
/**
 * @获取用户角色权限
 */
export function getAuthorityRole() {
  return sessionStorage.getItem('vue-erek-role')
}
/**
 * @设置用户角色权限
 */
export function setAuthorityRole(role) {
  return sessionStorage.setItem('vue-erek-role', role)
}
/**
 * @获取用户角色权限
 */
export function getAuthorityDepartID() {
  return sessionStorage.getItem('vue-erek-departmentId')
}
/**
 * @设置用户部门ID
 */
export function setAuthorityDepartID(role) {
  return sessionStorage.setItem('vue-erek-departmentId', role)
}

export default {}
