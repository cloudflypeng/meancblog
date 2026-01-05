<script setup lang="ts" vapor>
import { ref, computed, onMounted } from 'vue'
import Part from '../layout/Part.vue'
import packageJson from '../../package.json'

const printedLines = ref(0)
const isPrinting = ref(false)

interface ReceiptLine {
  text: string
  clickable?: boolean
  packageName?: string
  isDependency?: boolean
  name?: string
  version?: string
  isSeparator?: boolean
  separatorType?: 'solid' | 'dashed'
}

const receiptLines = ref<ReceiptLine[]>([])

// 解析依赖
const dependencies = computed(() => {
  return Object.entries(packageJson.dependencies || {})
})

const devDependencies = computed(() => {
  return Object.entries(packageJson.devDependencies || {})
})

const allDepsCount = computed(() => dependencies.value.length + devDependencies.value.length)

onMounted(() => {
  generateReceipt()
  startPrinting()
})

const generateReceipt = () => {
  const lines: ReceiptLine[] = []
  
  // 小票头部
  lines.push({ text: '', isSeparator: true, separatorType: 'solid' })
  lines.push({ text: '        NPM PACKAGE RECEIPT          ' })
  lines.push({ text: '', isSeparator: true, separatorType: 'solid' })
  lines.push({ text: '' })
  lines.push({ text: `Project: ${packageJson.name}` })
  lines.push({ text: `Version: ${packageJson.version}` })
  lines.push({ text: `Date: ${new Date().toLocaleString('zh-CN')}` })
  lines.push({ text: '' })
  lines.push({ text: '', isSeparator: true, separatorType: 'dashed' })
  lines.push({ text: '  ITEM                    VERSION    ' })
  lines.push({ text: '', isSeparator: true, separatorType: 'dashed' })
  
  // 生产依赖
  if (dependencies.value.length > 0) {
    lines.push({ text: '' })
    lines.push({ text: '[PRODUCTION DEPENDENCIES]' })
    dependencies.value.forEach(([name, version]) => {
      lines.push({ 
        text: '',
        isDependency: true,
        name: name,
        version: version,
        clickable: true,
        packageName: name
      })
    })
  }
  
  // 开发依赖
  if (devDependencies.value.length > 0) {
    lines.push({ text: '' })
    lines.push({ text: '[DEVELOPMENT DEPENDENCIES]' })
    devDependencies.value.forEach(([name, version]) => {
      lines.push({ 
        text: '',
        isDependency: true,
        name: name,
        version: version,
        clickable: true,
        packageName: name
      })
    })
  }
  
  // 小票底部
  lines.push({ text: '' })
  lines.push({ text: '', isSeparator: true, separatorType: 'dashed' })
  lines.push({ text: `TOTAL PACKAGES:           ${allDepsCount.value}` })
  lines.push({ text: `Production:               ${dependencies.value.length}` })
  lines.push({ text: `Development:              ${devDependencies.value.length}` })
  lines.push({ text: '', isSeparator: true, separatorType: 'dashed' })
  lines.push({ text: '' })
  lines.push({ text: '    Package Manager: ' + (packageJson.packageManager?.split('@')[0] || 'npm') })
  lines.push({ text: '' })
  lines.push({ text: '         THANK YOU!         ' })
  lines.push({ text: '      Happy Coding! 💻      ' })
  lines.push({ text: '' })
  lines.push({ text: '', isSeparator: true, separatorType: 'solid' })
  
  receiptLines.value = lines
}

const startPrinting = () => {
  isPrinting.value = true
  const printInterval = setInterval(() => {
    if (printedLines.value < receiptLines.value.length) {
      printedLines.value++
    } else {
      clearInterval(printInterval)
      isPrinting.value = false
    }
  }, 50)
}

const reprint = () => {
  printedLines.value = 0
  startPrinting()
}

const openNpmLink = (packageName: string) => {
  window.open(`https://www.npmjs.com/package/${packageName}`, '_blank')
}
</script>

<template>
  <Part title="Dependencies" id="dependencies">
    <div class="divider"></div>
    
    <div class="receipt-section" @click="reprint">
      <div class="receipt-container">
        <!-- 小票纸（向上延伸） -->
        <div class="receipt-paper">
          
          <!-- 小票内容 -->
          <div class="receipt-content">
            <template
              v-for="(line, index) in receiptLines.slice(0, printedLines)"
              :key="index"
            >
              <!-- 分隔线 -->
              <div
                v-if="line.isSeparator"
                class="receipt-line separator-line"
                :class="[
                  { 'printing': index === printedLines - 1 && isPrinting },
                  `separator-${line.separatorType}`
                ]"
              ></div>
              
              <!-- 依赖项（两列布局） -->
              <div
                v-else-if="line.isDependency"
                class="receipt-line dependency-line"
                :class="{ 
                  'printing': index === printedLines - 1 && isPrinting,
                  'clickable': line.clickable
                }"
                @click="line.clickable && line.packageName ? openNpmLink(line.packageName) : null"
              >
                <span class="dep-name">  {{ line.name }}</span>
                <span class="dep-version">{{ line.version }}</span>
              </div>
              
              <!-- 普通文本行 -->
              <div
                v-else
                class="receipt-line"
                :class="{ 
                  'printing': index === printedLines - 1 && isPrinting
                }"
              >
                {{ line.text }}
              </div>
            </template>
            
            <!-- 打印头指示器 -->
            <div v-if="isPrinting" class="print-head"></div>
          </div>
          
        </div>
        
        <!-- 打印机外壳（固定大小，在下面） -->
        <div class="printer-shell">
          <!-- 出纸口（在上面） -->
          <div class="printer-slot">
            <div class="slot-opening"></div>
            <div class="slot-shadow"></div>
          </div>
          
          <!-- 打印机面板（在下面） -->
          <div class="printer-panel cursor-pointer">
            <div class="printer-lights">
              <div class="light" :class="{ active: isPrinting }"></div>
              <div class="light ready"></div>
            </div>
            <div class="printer-brand">THERMAL PRINTER</div>
          </div>
        </div>
      
      </div>
    </div>
  </Part>
</template>

<style scoped>
.divider {
  width: 100%;
  height: 1px;
  background: repeating-linear-gradient(90deg, var(--border-color) 0 15px, transparent 0 30px);
}

.receipt-section {
  padding: var(--padding-default);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.receipt-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

/* 小票纸（向上延伸） */
.receipt-paper {
  position: relative;
  width: 380px;
  overflow: hidden;
  background: #f9f9f9;
  padding: 2rem 1.5rem;
  padding-bottom: 2.5rem;
  margin-bottom: -30px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
  font-size: 0.9rem;
  line-height: 1.5;
  border-radius: 4px 4px 0 0;
  z-index: 5;
  background: linear-gradient(to bottom, #ffffff 95%, #3c3c3c 99%, #000000 100%);
}

/* 打印机外壳（固定大小） */
.printer-shell {
  position: relative;
  width: 480px;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  z-index: -1;
  transform: translate(0, -50px);
}

/* 出纸口（在顶部） */
.printer-slot {
  position: relative;
  background: linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 100%);
  border-radius: 8px;
  padding: 1.5rem;
  height: 20px;
  box-shadow: inset 0 -2px 8px rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 1rem;
}

/* 出纸口开口（在顶部） */
.slot-opening {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  height: 4px;
  background: #000;
  border-radius: 2px;
}

/* 出纸口内部阴影（从下往上） */
.slot-shadow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%);
  border-radius: 0 0 8px 8px;
  pointer-events: none;
}

/* 打印机面板（在底部） */
.printer-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

/* 指示灯 */
.printer-lights {
  display: flex;
  gap: 0.75rem;
}

.light {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #666;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.light.active {
  background: #f39c12;
  box-shadow: 0 0 8px #f39c12, inset 0 1px 2px rgba(0, 0, 0, 0.3);
  animation: blink 1s ease-in-out infinite;
}

.light.ready {
  background: #27ae60;
  box-shadow: 0 0 6px #27ae60, inset 0 1px 2px rgba(0, 0, 0, 0.3);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* 打印机品牌文字 */
.printer-brand {
  font-size: 0.65rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
  text-transform: uppercase;
}


.receipt-content {
  position: relative;
  overflow: hidden;
  overflow-x: auto;
  color: #1a1a1a;
  white-space: pre-wrap;
  word-break: break-all;
  padding-top: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.receipt-line {
  animation: fadeIn 0.1s ease;
}

.receipt-line.printing {
  animation: printLine 0.05s ease;
}

/* 分隔线样式 */
.separator-line {
  height: 1px;
  margin: 0.25rem 0;
  border: none;
}

.separator-solid {
  border-top: 2px solid #1a1a1a;
}

.separator-dashed {
  border-top: 1px dashed #1a1a1a;
}

/* 依赖项两列布局 */
.dependency-line {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.dep-name {
  flex: 0 0 auto;
  min-width: 180px;
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dep-version {
  flex: 1;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-wrap: break-word;
}

/* 可点击的行 */
.receipt-line.clickable {
  cursor: pointer;
  transition: all 0.2s ease;
}

.receipt-line.clickable:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #0066cc;
  transform: translateX(2px);
}

/* 打印头动画 */
.print-head {
  height: 2px;
  background: linear-gradient(90deg, transparent, #333, transparent);
  margin-top: 2px;
  animation: scanning 0.5s ease-in-out infinite;
}

@keyframes scanning {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes printLine {
  from {
    opacity: 0;
    filter: blur(1px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}

/* 重新打印按钮 */
.reprint-btn {
  padding: 0.75rem 1.5rem;
  margin-top: 1.5rem;
  background: var(--primary-color);
  color: var(--secondary-color);
  border: 2px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reprint-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.reprint-btn:active {
  transform: translateY(0);
}

/* 打印机图标 */
.printer-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.printer-icon :deep(svg) {
  width: 100%;
  height: 100%;
  stroke: currentColor;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .receipt-paper {
    background: #e8e8e8;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  }

  
  .receipt-content {
    color: #1a1a1a;
  }
  
  .receipt-line.clickable:hover {
    background: rgba(0, 0, 0, 0.08);
    color: #0066cc;
  }
  
  .separator-solid {
    border-top-color: #1a1a1a;
  }
  
  .separator-dashed {
    border-top-color: #1a1a1a;
  }

}

/* 移动端适配 */
@media (max-width: 768px) {
  .receipt-paper {
    width: 320px;
    font-size: 0.8rem;
    padding: 1.5rem 1rem;
    padding-bottom: 2rem;
    margin-bottom: -20px;
  }
  
  .printer-shell {
    width: 360px;
    padding: 1rem;
    z-index: -1;
    transform: translate(0, -50px);
  }
  
  .printer-slot {
    padding: 1rem;
    height: 90px;
    margin-bottom: 0.75rem;
  }
  
  .slot-shadow {
    height: 30px;
  }
  
  .slot-opening {
    width: 90%;
    height: 3px;
  }
  
  .printer-panel {
    padding: 0.4rem 0.75rem;
  }
  
  .printer-brand {
    font-size: 0.55rem;
  }
  
  .receipt-content {
    overflow-x: scroll;
  }
  
  .dep-name {
    min-width: 100px;
    max-width: 100px;
  }
}

/* 超小屏幕适配 */
@media (max-width: 400px) {
  .receipt-paper {
    width: 280px;
    font-size: 0.75rem;
    padding: 1rem 0.75rem;
    padding-bottom: 1.5rem;
  }
  
  .printer-shell {
    width: 320px;
    padding: 0.75rem;
  }
  
  .dep-name {
    min-width: 80px;
    max-width: 80px;
  }
}

/* 滚动条样式 */
.receipt-content::-webkit-scrollbar {
  height: 6px;
}

.receipt-content::-webkit-scrollbar-track {
  background: #ddd;
  border-radius: 3px;
}

.receipt-content::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 3px;
}

.receipt-content::-webkit-scrollbar-thumb:hover {
  background: #666;
}
</style>

