import type { ReactElement } from 'react'

export type ProfileCardProps = {
  avatarUrl?: string
  iconUrl?: string
  miniAvatarUrl?: string
  name?: string
  title?: string
  handle?: string
  handlePrefix?: string
  status?: string
  statusColor?: string
  contactText?: string
  showUserInfo?: boolean
  onContactClick?: () => void
  theme?: 'dark' | 'light'
  backdropColor?: string
  radius?: number
  holo?: number
  glare?: number
  enableTilt?: boolean
  tiltStrength?: number
  parallax?: number
  enableMobileTilt?: boolean
  mobileTiltSensitivity?: number
  intro?: boolean
  className?: string
}

declare function ProfileCard(props: ProfileCardProps): ReactElement

export default ProfileCard