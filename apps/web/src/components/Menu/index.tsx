import { useTranslation } from '@pancakeswap/localization'
import { Menu as UikitMenu, footerLinks, useModal, Text } from '@pancakeswap/uikit'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { usePhishingBanner } from '@pancakeswap/utils/user'
import { NextLinkFromReactRouter } from '@pancakeswap/widgets-internal'
import USCitizenConfirmModal from 'components/Modal/USCitizenConfirmModal'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import PhishingWarningBanner from 'components/PhishingWarningBanner'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { usePerpUrl } from 'hooks/usePerpUrl'
import useTheme from 'hooks/useTheme'
import { IdType, useUserNotUsCitizenAcknowledgement } from 'hooks/useUserIsUsCitizenAcknowledgement'
import { useWebNotifications } from 'hooks/useWebNotifications'
import { useRouter } from 'next/router'
import { Suspense, lazy, useCallback, useMemo } from 'react'
import { getOptionsUrl } from 'utils/getOptionsUrl'
import GlobalSettings from './GlobalSettings'
import { SettingsMode } from './GlobalSettings/types'
import UserMenu from './UserMenu'
import { UseMenuItemsParams, useMenuItems } from './hooks/useMenuItems'
import { getActiveMenuItem, getActiveSubMenuChildItem, getActiveSubMenuItem } from './utils'

const Notifications = lazy(() => import('views/Notifications'))

const LinkComponent = (linkProps) => {
  return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
}

const Menu = (props) => {
  const { enabled } = useWebNotifications()
  const { chainId } = useActiveChainId()
  const { isDark, setTheme } = useTheme()
  const { t } = useTranslation()
  const { pathname } = useRouter()
  const perpUrl = usePerpUrl({ chainId, isDark })
  const [perpConfirmed] = useUserNotUsCitizenAcknowledgement(IdType.PERPETUALS)
  const [optionsConfirmed] = useUserNotUsCitizenAcknowledgement(IdType.OPTIONS)

  const [onPerpConfirmModalPresent] = useModal(
    <USCitizenConfirmModal title={t('PancakeSwap Perpetuals')} id={IdType.PERPETUALS} href={perpUrl} />,
    true,
    false,
    'perpConfirmModal',
  )
  const [onOptionsConfirmModalPresent] = useModal(
    <USCitizenConfirmModal
      title={t('PancakeSwap Options')}
      id={IdType.OPTIONS}
      href={getOptionsUrl()}
      desc={
        <Text mt="0.5rem">
          {t(
            'Please note that you are being redirected to an externally hosted website associated with our partner Stryke (formerly Dopex).',
          )}
        </Text>
      }
    />,
    true,
    false,
    'optionsConfirmModal',
  )
  const onSubMenuClick = useCallback<NonNullable<UseMenuItemsParams['onClick']>>(
    (e, item) => {
      const preventRedirect = () => {
        e.preventDefault()
        e.stopPropagation()
      }
      if (item.confirmModalId === 'perpConfirmModal' && !perpConfirmed) {
        preventRedirect()
        onPerpConfirmModalPresent()
        return
      }
      if (item.confirmModalId === 'optionsConfirmModal' && !optionsConfirmed) {
        preventRedirect()
        onOptionsConfirmModalPresent()
      }
    },
    [perpConfirmed, optionsConfirmed, onPerpConfirmModalPresent, onOptionsConfirmModalPresent],
  )
  const [showPhishingWarningBanner] = usePhishingBanner()

  const menuItems = useMenuItems({
    onClick: onSubMenuClick,
  })

  const activeMenuItem = useMemo(() => getActiveMenuItem({ menuConfig: menuItems, pathname }), [menuItems, pathname])
  const activeSubMenuItem = useMemo(
    () => getActiveSubMenuItem({ menuItem: activeMenuItem, pathname }),
    [pathname, activeMenuItem],
  )
  const activeSubChildMenuItem = useMemo(
    () => getActiveSubMenuChildItem({ menuItem: activeMenuItem, pathname }),
    [activeMenuItem, pathname],
  )

  const toggleTheme = useMemo(() => {
    return () => setTheme(isDark ? 'light' : 'dark')
  }, [setTheme, isDark])

  const getFooterLinks = useMemo(() => {
    return footerLinks(t)
  }, [t])

  return (
    <UikitMenu
      linkComponent={LinkComponent}
      rightSide={
        <>
          <GlobalSettings mode={SettingsMode.GLOBAL} />
          {enabled && (
            <Suspense fallback={null}>
              <Notifications />
            </Suspense>
          )}
          <NetworkSwitcher />
          <UserMenu />
        </>
      }
      chainId={chainId}
      banner={false}  // 禁用广告横幅但保留导航栏
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang="en"
      langs={[{ code: 'en', language: 'English', locale: 'en-US' }]}
      setLang={() => null}
      hideLanguage
      links={menuItems}
      subLinks={
        activeSubMenuItem?.overrideSubNavItems ??
        activeMenuItem?.overrideSubNavItems ??
        (activeMenuItem?.hideSubNav || activeSubMenuItem?.hideSubNav
          ? []
          : activeSubMenuItem?.items ?? activeMenuItem?.items)
      }
      footerLinks={getFooterLinks}
      activeItem={activeMenuItem?.href}
      activeSubItem={activeSubMenuItem?.href}
      activeSubItemChildItem={activeSubChildMenuItem?.href}
      {...props}
    />
  )
}

export default Menu
