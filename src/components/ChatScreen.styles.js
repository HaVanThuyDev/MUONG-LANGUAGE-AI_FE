import { StyleSheet, Platform } from 'react-native';

const CLAUDE_BG = '#FBFBF9';
const CLAUDE_SIDEBAR = '#F3F2EE';
const CLAUDE_BORDER = '#E5E3DD';
const CLAUDE_TEXT = '#2E2C29';
const CLAUDE_MUTED = '#78756E';
const CLAUDE_TERRACOTTA = '#C2673B';
const CLAUDE_USER_BUBBLE = '#ECEAE4';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CLAUDE_BG,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },

  // SIDEBAR (SILKY-SMOOTH DRAWER ON MOBILE/TABLET, SIDE-BY-SIDE ON DESKTOP)
  sidebar: {
    width: 250,
    backgroundColor: CLAUDE_SIDEBAR,
    borderRightWidth: 1,
    borderRightColor: CLAUDE_BORDER,
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 100,
  },
  sidebarOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
    ...Platform.select({
      web: { boxShadow: '4px 0 28px rgba(0,0,0,0.12)' },
      default: { elevation: 16 },
    }),
  },
  sidebarBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    zIndex: 900,
  },
  sidebarHeader: {
    padding: 12,
  },
  newChatClaudeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBE9E2',
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 10,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  newChatClaudeText: {
    fontSize: 14,
    fontWeight: '600',
    color: CLAUDE_TEXT,
  },

  // Sidebar Menu Items
  sidebarMenuList: {
    gap: 2,
    marginBottom: 10,
  },
  sidebarMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 10,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  sidebarMenuText: {
    fontSize: 13,
    color: '#44403C',
    fontWeight: '500',
  },

  // Search Bar inside sidebar
  searchBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    gap: 6,
    marginBottom: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: CLAUDE_TEXT,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
      },
    }),
  },
  noSearchResultText: {
    fontSize: 12,
    color: CLAUDE_MUTED,
    fontStyle: 'italic',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  // Section Header: "Đoạn chat và tác vụ ˇ"
  historySectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    marginTop: 2,
  },
  historySectionTitle: {
    fontSize: 12.5,
    fontWeight: '600',
    color: CLAUDE_TEXT,
  },

  // History List
  historySection: {
    flex: 1,
    paddingHorizontal: 6,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 2,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  historyItemActive: {
    backgroundColor: '#E5E3DD',
  },
  historyItemBullet: {
    fontSize: 14,
    color: '#A8A29E',
    marginRight: 8,
    lineHeight: 16,
  },
  historyItemText: {
    flex: 1,
    fontSize: 13,
    color: CLAUDE_TEXT,
  },
  historyItemActiveText: {
    fontWeight: '600',
  },
  deleteHistoryBtn: {
    padding: 3,
    opacity: 0.6,
  },

  // Sidebar Footer: Profile
  sidebarFooter: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: CLAUDE_BORDER,
    backgroundColor: CLAUDE_SIDEBAR,
  },
  userProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userProfileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  userAvatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  userProfileNameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  userName: {
    fontSize: 13,
    fontWeight: '600',
    color: CLAUDE_TEXT,
    maxWidth: 90,
  },
  userTier: {
    fontSize: 11.5,
    color: CLAUDE_MUTED,
  },
  logoutBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    backgroundColor: '#FFFFFF',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  logoutText: {
    fontSize: 11,
    color: CLAUDE_MUTED,
  },

  // MAIN CONTAINER (FULL RESPONSIVE)
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: CLAUDE_BG,
    height: '100%',
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: CLAUDE_BORDER,
    backgroundColor: CLAUDE_BG,
    zIndex: 10,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuToggleBtn: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    backgroundColor: '#FFFFFF',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: CLAUDE_TEXT,
  },

  // Chat Scroll Area
  chatScrollView: {
    flex: 1,
    backgroundColor: CLAUDE_BG,
  },
  chatContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    maxWidth: 760,
    width: '100%',
    alignSelf: 'center',
  },

  // Welcome Screen (Responsive)
  welcomeWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 46,
    paddingHorizontal: 12,
  },
  welcomeWrapMobile: {
    paddingVertical: 24,
  },
  welcomeLogo: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: CLAUDE_TEXT,
    marginBottom: 6,
    textAlign: 'center',
  },
  welcomeDesc: {
    fontSize: 13.5,
    color: CLAUDE_MUTED,
    textAlign: 'center',
    maxWidth: 420,
    lineHeight: 20,
  },

  // Chat message rows
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
    alignItems: 'flex-start',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  messageRowAi: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginTop: 3,
  },
  bubbleUser: {
    maxWidth: '82%',
    backgroundColor: CLAUDE_USER_BUBBLE,
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  bubbleUserMobile: {
    maxWidth: '88%',
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  bubbleAi: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 23,
    color: CLAUDE_TEXT,
  },
  bubbleTextUser: {
    fontSize: 15,
    lineHeight: 22,
    color: CLAUDE_TEXT,
  },
  bubbleImage: {
    width: 220,
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },

  // Thinking State
  thinkingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  thinkingText: {
    fontSize: 14,
    color: CLAUDE_MUTED,
    fontStyle: 'italic',
  },

  // ==========================================
  // RESPONSIVE CHAT INPUT CARD (CLAUDE EXACT)
  // ==========================================
  inputOuterContainer: {
    paddingHorizontal: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingTop: 6,
    backgroundColor: CLAUDE_BG,
    alignItems: 'center',
  },
  inputCardContainer: {
    width: '100%',
    maxWidth: 760,
  },
  imagePreviewPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
    alignSelf: 'flex-start',
    gap: 8,
  },
  imagePreviewText: {
    fontSize: 12,
    color: CLAUDE_TEXT,
    maxWidth: 240,
  },

  // THE CLAUDE CARD
  claudeCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 8,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
      },
    }),
  },
  textInput: {
    fontSize: 15,
    color: CLAUDE_TEXT,
    lineHeight: 22,
    minHeight: 42,
    maxHeight: 130,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginBottom: 8,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
        borderStyle: 'none',
        resize: 'none',
      },
    }),
  },

  // BOTTOM CONTROLS BAR (RESPONSIVE FOR PHONE, IPAD, DESKTOP)
  cardBottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    position: 'relative',
    zIndex: 50,
  },
  cardBottomBarMobile: {
    flexWrap: 'wrap',
    gap: 6,
    rowGap: 8,
  },
  cardBottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  plusAttachBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },

  // Mode Segmented Pill: [Đoạn chat] [Đặc sắc văn hóa]
  modeSegmentedWrap: {
    flexDirection: 'row',
    backgroundColor: '#F3F2EE',
    borderRadius: 9,
    padding: 2.5,
    gap: 2,
  },
  modeBtn: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  modeBtnActive: {
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
    }),
  },
  modeBtnText: {
    fontSize: 12.5,
    color: CLAUDE_MUTED,
    fontWeight: '500',
  },
  modeBtnTextActive: {
    color: CLAUDE_TEXT,
    fontWeight: '600',
  },

  // Right Controls: [Chủ đề] [Send]
  cardBottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardBottomRightMobile: {
    marginLeft: 'auto',
  },
  topicSelectorTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 7,
    gap: 4,
    backgroundColor: '#F7F6F3',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  topicSelectorText: {
    fontSize: 12.5,
    color: CLAUDE_TEXT,
    fontWeight: '500',
  },

  // DROPDOWN MENU
  topicDropdownMenu: {
    position: 'absolute',
    right: 36,
    bottom: 42,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    borderRadius: 12,
    paddingVertical: 6,
    width: 195,
    zIndex: 999,
    ...Platform.select({
      web: { boxShadow: '0 6px 20px rgba(0,0,0,0.12)' },
    }),
  },
  topicDropdownMenuMobile: {
    right: 0,
    bottom: 38,
    width: 185,
  },
  topicMenuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  topicMenuItemActive: {
    backgroundColor: '#F3F2EE',
  },
  topicMenuItemText: {
    fontSize: 12.5,
    color: CLAUDE_TEXT,
  },
  topicMenuItemTextActive: {
    fontWeight: '600',
    color: CLAUDE_TERRACOTTA,
  },

  // Send Button
  claudeSendBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: CLAUDE_TERRACOTTA,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  claudeSendBtnDisabled: {
    backgroundColor: '#D6D3CD',
    ...Platform.select({ web: { cursor: 'not-allowed' } }),
  },
});
