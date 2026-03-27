import { useState, useRef } from 'react'
import {
  Menu, Header, Form, Input, Button, Icon, Segment, Checkbox,
  Radio, Message, TextArea, Divider, Popup, Label
} from 'semantic-ui-react'
import './GlobalSettings.css'

const tabs = ['Branding', 'Notifications', 'Link Metadata', 'Email Policy', 'Customization', 'Files', 'Help', 'ELC', 'Messages']

export default function GlobalSettings() {
  const [activeTab, setActiveTab] = useState('Branding')

  return (
    <div>
      <Header as="h1">Settings</Header>

      <Menu pointing secondary className="settings-tabs">
        {tabs.map(tab => (
          <Menu.Item
            key={tab}
            name={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </Menu>

      {activeTab === 'Branding' && <BrandingTab />}

      {activeTab !== 'Branding' && (
        <Segment placeholder>
          <Header icon>
            <Icon name="setting" />
            {activeTab} settings will appear here.
          </Header>
        </Segment>
      )}
    </div>
  )
}

const isValidHex = (val) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val)

const INITIAL_STATE = {
  name: 'yanatest',
  primaryColor: '#FFFFFF',
  customizeHeader: true,
  headerColor: '#000000',
  baristaTheme: 'default',
  customThemeColor: '#1B1C1D',
  chatBotName: 'Hocus',
  chatBotSvg: '',
  appLogo: { name: 'Resolve-Logo-Full-Color-PMS-Values-CMYK.png', url: null },
  loginLogo: null,
  bgImage: null,
  widgetIcon: null,
  favicon: null,
}

function FileUploadField({ label, optional, file, accept, onFileChange, onRemove }) {
  const inputRef = useRef(null)

  const handleClick = () => inputRef.current?.click()
  const handleChange = (e) => {
    const f = e.target.files?.[0]
    if (f) {
      const url = URL.createObjectURL(f)
      onFileChange({ name: f.name, url })
    }
    e.target.value = ''
  }

  return (
    <Form.Field>
      <label>{label} {optional && <span className="optional-tag">(Optional)</span>}</label>
      <input
        ref={inputRef}
        type="file"
        accept={accept || 'image/*'}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      {file ? (
        <div className="file-uploaded">
          {file.url && <img src={file.url} alt="" className="file-thumb" />}
          <span className="file-name-text">{file.name}</span>
          <Button color="red" icon size="mini" onClick={onRemove}><Icon name="trash" /></Button>
          <Button basic icon size="mini" onClick={handleClick}><Icon name="exchange" /></Button>
        </div>
      ) : (
        <Input
          labelPosition="left"
          placeholder="Select a file..."
          readOnly
          fluid
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        >
          <Label basic as="a" onClick={handleClick}>
            <Icon name="folder" style={{ margin: 0 }} />
          </Label>
          <input />
        </Input>
      )}
    </Form.Field>
  )
}

function BrandingTab() {
  const [name, setName] = useState(INITIAL_STATE.name)
  const [primaryColor, setPrimaryColor] = useState(INITIAL_STATE.primaryColor)
  const [customizeHeader, setCustomizeHeader] = useState(INITIAL_STATE.customizeHeader)
  const [headerColor, setHeaderColor] = useState(INITIAL_STATE.headerColor)
  const [baristaTheme, setBaristaTheme] = useState(INITIAL_STATE.baristaTheme)
  const [customThemeColor, setCustomThemeColor] = useState(INITIAL_STATE.customThemeColor)
  const [chatBotName, setChatBotName] = useState(INITIAL_STATE.chatBotName)
  const [chatBotSvg, setChatBotSvg] = useState(INITIAL_STATE.chatBotSvg)
  const [appLogo, setAppLogo] = useState(INITIAL_STATE.appLogo)
  const [loginLogo, setLoginLogo] = useState(INITIAL_STATE.loginLogo)
  const [bgImage, setBgImage] = useState(INITIAL_STATE.bgImage)
  const [widgetIcon, setWidgetIcon] = useState(INITIAL_STATE.widgetIcon)
  const [favicon, setFavicon] = useState(INITIAL_STATE.favicon)
  const [saved, setSaved] = useState(INITIAL_STATE)

  const isDirty = name !== saved.name ||
    primaryColor !== saved.primaryColor ||
    customizeHeader !== saved.customizeHeader ||
    headerColor !== saved.headerColor ||
    baristaTheme !== saved.baristaTheme ||
    customThemeColor !== saved.customThemeColor ||
    chatBotName !== saved.chatBotName ||
    chatBotSvg !== saved.chatBotSvg ||
    appLogo !== saved.appLogo ||
    loginLogo !== saved.loginLogo ||
    bgImage !== saved.bgImage ||
    widgetIcon !== saved.widgetIcon ||
    favicon !== saved.favicon

  const handleSave = () => {
    setSaved({ name, primaryColor, customizeHeader, headerColor, baristaTheme, customThemeColor, chatBotName, chatBotSvg, appLogo, loginLogo, bgImage, widgetIcon, favicon })
  }

  const handleDiscard = () => {
    setName(saved.name)
    setPrimaryColor(saved.primaryColor)
    setCustomizeHeader(saved.customizeHeader)
    setHeaderColor(saved.headerColor)
    setBaristaTheme(saved.baristaTheme)
    setCustomThemeColor(saved.customThemeColor)
    setChatBotName(saved.chatBotName)
    setChatBotSvg(saved.chatBotSvg)
    setAppLogo(saved.appLogo)
    setLoginLogo(saved.loginLogo)
    setBgImage(saved.bgImage)
    setWidgetIcon(saved.widgetIcon)
    setFavicon(saved.favicon)
  }

  const effectiveHeaderColor = customizeHeader && isValidHex(headerColor) ? headerColor : (isValidHex(primaryColor) ? primaryColor : '#000000')
  const effectivePrimary = isValidHex(primaryColor) ? primaryColor : '#FFFFFF'
  const effectiveBarista = baristaTheme === 'custom' && isValidHex(customThemeColor) ? customThemeColor : effectivePrimary

  return (
    <div className="branding-layout">
      {/* ---- LEFT COLUMN: FORM ---- */}
      <div className="branding-form">

        {/* Section 1: Identity */}
        <Segment>
          <Header as="h3" dividing>Application Identity</Header>

          <Form>
            <Form.Field required>
              <label>Application Name</label>
              <Input
                value={name}
                onChange={(e, { value }) => setName(value)}
                placeholder="Enter application name"
              />
              <p className="field-hint">Used in workflows, emails, and SMS.</p>
              {!name.trim() && <Label basic color="red" pointing>Name is required</Label>}
            </Form.Field>

            <FileUploadField
              label="Application Logo"
              file={appLogo}
              onFileChange={setAppLogo}
              onRemove={() => setAppLogo(null)}
            />

            <FileUploadField
              label="Login Page Logo"
              optional
              file={loginLogo}
              onFileChange={setLoginLogo}
              onRemove={() => setLoginLogo(null)}
            />

            <FileUploadField
              label="Background Image"
              optional
              file={bgImage}
              onFileChange={setBgImage}
              onRemove={() => setBgImage(null)}
            />
          </Form>
        </Segment>

        {/* Section 2: Colors */}
        <Segment>
          <Header as="h3" dividing>Colors</Header>

          <Form>
            <Form.Field>
              <label>Primary Color</label>
              <div className="color-field">
                <div
                  className="color-swatch"
                  style={{ background: isValidHex(primaryColor) ? primaryColor : '#fff' }}
                />
                <Input
                  value={primaryColor}
                  onChange={(e, { value }) => setPrimaryColor(value)}
                  placeholder="#FFFFFF"
                />
              </div>
              {primaryColor && !isValidHex(primaryColor) && (
                <Label basic color="red" pointing>Enter a valid hex color (e.g. #FF5500)</Label>
              )}
            </Form.Field>

            <Form.Field>
              <Checkbox
                label="Customize Header Color"
                checked={customizeHeader}
                onChange={(e, { checked }) => setCustomizeHeader(checked)}
              />
              {customizeHeader && (
                <div className="color-field" style={{ marginTop: 8 }}>
                  <div
                    className="color-swatch"
                    style={{ background: isValidHex(headerColor) ? headerColor : '#fff' }}
                  />
                  <Input
                    value={headerColor}
                    onChange={(e, { value }) => setHeaderColor(value)}
                    placeholder="#000000"
                  />
                </div>
              )}
              <p className="field-hint">Falls back to primary color if not set.</p>
              {customizeHeader && headerColor && !isValidHex(headerColor) && (
                <Label basic color="red" pointing>Enter a valid hex color</Label>
              )}
            </Form.Field>
          </Form>
        </Segment>

        {/* Section 3: Modern Barista Theme */}
        <Segment>
          <Header as="h3" dividing>Modern Barista Theme</Header>

          <Form>
            <Form.Field>
              <Radio
                label="Use default theme"
                name="baristaTheme"
                value="default"
                checked={baristaTheme === 'default'}
                onChange={() => setBaristaTheme('default')}
              />
              <p className="field-hint radio-hint">Legacy and modern Barista will share the same color.</p>
            </Form.Field>

            <Form.Field>
              <Radio
                label="Use custom color"
                name="baristaTheme"
                value="custom"
                checked={baristaTheme === 'custom'}
                onChange={() => setBaristaTheme('custom')}
              />
              <p className="field-hint radio-hint">Does not affect legacy. Modern Barista gets its own theme.</p>
              {baristaTheme === 'custom' && (
                <div className="color-field" style={{ marginTop: 8 }}>
                  <div
                    className="color-swatch"
                    style={{ background: isValidHex(customThemeColor) ? customThemeColor : '#fff' }}
                  />
                  <Input
                    value={customThemeColor}
                    onChange={(e, { value }) => setCustomThemeColor(value)}
                    placeholder="#1B1C1D"
                  />
                </div>
              )}
            </Form.Field>
          </Form>
        </Segment>

        {/* Section 4: Bot Identity & Branding */}
        <Segment>
          <Header as="h3" dividing>Bot Identity &amp; Branding</Header>

          <Message info size="small">
            <Icon name="info circle" />
            To customize an integration, please reach out to your customer success representative.
          </Message>

          <Form>
            <Form.Field>
              <label>ChatBot Name</label>
              <Input
                value={chatBotName}
                onChange={(e, { value }) => setChatBotName(value)}
                placeholder="Enter chatbot name"
              />
            </Form.Field>

            <Form.Field>
              <label>
                ChatBot Icon/Logo
                <Popup
                  content="Must be in SVG format. Paste SVG code into the text box."
                  trigger={<Icon name="info circle" color="grey" style={{ marginLeft: 4 }} />}
                  position="top center"
                  inverted
                  size="small"
                />
              </label>
              <TextArea
                rows={4}
                placeholder="Paste SVG code here..."
                value={chatBotSvg}
                onChange={(e, { value }) => setChatBotSvg(value)}
              />
              {chatBotSvg && !chatBotSvg.trim().startsWith('<svg') && (
                <Label basic color="red" pointing>SVG code should start with {'<svg'}</Label>
              )}
            </Form.Field>

            <FileUploadField
              label="Widget Icon"
              optional
              accept="image/png"
              file={widgetIcon}
              onFileChange={setWidgetIcon}
              onRemove={() => setWidgetIcon(null)}
            />

            <FileUploadField
              label="Favicon"
              file={favicon}
              accept="image/x-icon,image/png"
              onFileChange={setFavicon}
              onRemove={() => setFavicon(null)}
            />
          </Form>
        </Segment>

      </div>

      {/* ---- RIGHT COLUMN: LIVE PREVIEWS ---- */}
      <div className="branding-preview">
        <div className="preview-sticky">
          {/* Login View */}
          <Header as="h4" className="preview-header">
            <Icon name="sign-in" size="small" />
            Login View
          </Header>
          <Segment className="preview-card">
            <div className="preview-login">
              <div className="preview-logo-text">{name || 'App Name'}</div>
              <div className="mock-input" />
              <div className="mock-input" />
              <div className="mock-input-btn" style={{ background: effectivePrimary, color: '#fff' }}>
                Sign In
              </div>
            </div>
          </Segment>

          {/* Application View (Legacy) */}
          <Header as="h4" className="preview-header">
            <Icon name="desktop" size="small" />
            Application View
          </Header>
          <Segment className="preview-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="preview-app-header" style={{ background: effectiveHeaderColor }}>
              <span className="logo-text-white">{name || 'App Name'}</span>
            </div>
            <div className="preview-app-body">
              <div className="preview-app-sidebar" />
              <div className="preview-app-main">
                <div className="mock-block" />
                <div className="mock-block" style={{ width: '50%' }} />
                <div className="mock-block-btn" style={{ background: effectivePrimary, opacity: 0.8 }} />
              </div>
            </div>
          </Segment>

          {/* Application View (Modern Barista) */}
          <Header as="h4" className="preview-header">
            <Icon name="coffee" size="small" />
            Application View (Modern Barista)
          </Header>
          <Segment className="preview-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="preview-modern-sidebar" style={{ background: effectiveBarista }}>
              <div className="preview-modern-logo">{name || 'App'}</div>
              <div className="preview-modern-nav">
                <div className="modern-nav-item active" />
                <div className="modern-nav-item" />
                <div className="modern-nav-item" />
                <div className="modern-nav-item" />
              </div>
            </div>
            <div className="preview-modern-main">
              <div className="modern-topbar" />
              <div className="modern-content">
                <div className="mock-block" />
                <div className="mock-block" style={{ width: '60%' }} />
              </div>
              <div className="modern-footer">
                <div className="mock-block" style={{ width: '80%', margin: '0 auto' }} />
              </div>
            </div>
          </Segment>

          {/* Chat View */}
          <Header as="h4" className="preview-header">
            <Icon name="chat" size="small" />
            Chat View
          </Header>
          <Segment className="preview-card">
            <div className="preview-chat">
              <div className="chat-header" style={{ background: effectivePrimary }}>
                <div className="chat-bot-avatar">
                  <Icon name="robot" size="small" />
                </div>
                <span className="chat-bot-name">{chatBotName || 'Bot'}</span>
              </div>
              <div className="chat-body">
                <div className="chat-msg bot">
                  <div className="chat-bubble bot-bubble">Hi! How can I help you today?</div>
                </div>
                <div className="chat-msg user">
                  <div className="chat-bubble user-bubble" style={{ background: effectivePrimary, color: '#fff' }}>
                    I need help with VPN
                  </div>
                </div>
              </div>
              <div className="chat-input-bar">
                <div className="chat-input-mock">Type a message...</div>
                <div className="chat-send" style={{ background: effectivePrimary }}>
                  <Icon name="send" size="small" style={{ color: '#fff', margin: 0 }} />
                </div>
              </div>
            </div>
          </Segment>

          {/* Bot Icon Safe Area */}
          <Header as="h4" className="preview-header">
            <Icon name="protect" size="small" />
            Bot Icon Safe Area
          </Header>
          <Segment className="preview-card">
            <p className="field-hint" style={{ marginBottom: 12 }}>
              Use a 512px grid with 64px gutter. Icon should not extend into the red area.
              No background fill, single color fill only. Fill color matches Primary Color.
            </p>
            <div className="safe-area-preview">
              <div className="safe-area-border" />
              <div className="safe-area-icon">
                <Icon name="robot" size="huge" style={{ color: effectivePrimary }} />
              </div>
            </div>
          </Segment>

          {/* Widget Icon Preview */}
          <Header as="h4" className="preview-header">
            <Icon name="window maximize outline" size="small" />
            Widget Icon Preview
          </Header>
          <Segment className="preview-card" textAlign="center">
            <p className="field-hint" style={{ marginBottom: 12 }}>
              Widget icon as it will appear when added to a page. Falls back to custom bot icon, then default Barista icon.
            </p>
            <div className="widget-preview">
              <div className="widget-icon" style={{ background: effectivePrimary }}>
                <Icon name="robot" style={{ color: '#fff', margin: 0 }} />
              </div>
            </div>
          </Segment>
        </div>
      </div>

      {/* Sticky save bar */}
      <div className={`save-bar ${isDirty ? 'visible' : ''}`}>
        <div className="save-bar-inner">
          <div className="save-bar-message">
            <Icon name="warning circle" />
            You have unsaved changes
          </div>
          <div className="save-bar-actions">
            <Button basic inverted size="small" onClick={handleDiscard}>
              Discard
            </Button>
            <Button color="green" size="small" onClick={handleSave}>
              <Icon name="save" /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
