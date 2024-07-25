export interface NetIconProps {
  url?: string
  prefix?: string
  fontFamily?: string
  type: string
}
export interface IconPickerSubmitDataType {
  icon: string
  color: string
  fontSize: number
}

export interface IconListType {
  iconData?: string[]
  collection?: string
  itemClass: string
  iconClass: string
  activeClass: string
  showText: boolean
}
