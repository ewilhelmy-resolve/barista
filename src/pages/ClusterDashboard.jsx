import { useState } from 'react'
import { Button, Statistic, Table, Select, Menu, Icon, Popup, Header, Dropdown } from 'semantic-ui-react'
import './ClusterDashboard.css'

const treemapCells = [
  { label: 'topic_58', count: 180, color: 'yellow', icon: 'red-sq', pos: { left: '0%', top: '0%', width: '14%', height: '22%' }, tickets: 3, interactions: 180, outcome: '55.20%', deflection: '82.10%' },
  { label: 'Guest Wifi Access and Password', count: 82, color: 'yellow', icon: 'check', pos: { left: '14%', top: '0%', width: '18%', height: '22%' }, tickets: 0, interactions: 82, outcome: '68.30%', deflection: '91.50%' },
  { label: 'Apple Device Issues', count: 35, color: 'yellow', icon: 'check', pos: { left: '32%', top: '0%', width: '10%', height: '22%' }, tickets: 1, interactions: 35, outcome: '48.60%', deflection: '74.30%' },
  { label: 'Outlook and Teams Access Issues', count: 78, color: 'yellow', icon: 'check', pos: { left: '42%', top: '0%', width: '12%', height: '22%' }, tickets: 2, interactions: 78, outcome: '59.00%', deflection: '85.90%' },
  { label: '40', count: 8, color: 'green', icon: 'check', pos: { left: '54%', top: '0%', width: '4%', height: '22%' }, tickets: 0, interactions: 8, outcome: '87.50%', deflection: '100.00%' },
  { label: 'Employee Policies and Procedures', count: 128, color: 'yellow', icon: 'check', pos: { left: '58%', top: '0%', width: '18%', height: '22%' }, tickets: 1, interactions: 128, outcome: '64.10%', deflection: '89.80%' },
  { label: 'Cisco Access', count: 8, color: 'red', icon: 'red-sq', pos: { left: '76%', top: '0%', width: '8%', height: '14%' }, tickets: 4, interactions: 8, outcome: '25.00%', deflection: '37.50%' },
  { label: 'Command Information', count: null, color: 'red', pos: { left: '84%', top: '0%', width: '16%', height: '14%' }, tickets: 2, interactions: 12, outcome: '33.30%', deflection: '41.70%' },
  { label: 'Technical and...', count: 34, color: 'red', icon: 'check', pos: { left: '76%', top: '14%', width: '12%', height: '10%' }, tickets: 1, interactions: 34, outcome: '41.20%', deflection: '58.80%' },
  { label: 'Google Drive Fo...', count: 41, color: 'red', icon: 'check', pos: { left: '88%', top: '14%', width: '12%', height: '10%' }, tickets: 0, interactions: 41, outcome: '39.00%', deflection: '53.70%' },
  { label: 'Testing and ChatGPT Interactions', count: 198, color: 'yellow', icon: 'check', pos: { left: '0%', top: '22%', width: '28%', height: '24%' }, tickets: 0, interactions: 198, outcome: '72.20%', deflection: '93.40%' },
  { label: 'VPN Connection Issues and Access', count: 186, color: 'yellow', icon: 'check', pos: { left: '28%', top: '22%', width: '26%', height: '24%' }, tickets: 2, interactions: 186, outcome: '58.60%', deflection: '84.40%' },
  { label: '', count: null, color: 'yellow', pos: { left: '54%', top: '22%', width: '22%', height: '24%' }, tickets: 0, interactions: 150, outcome: '66.00%', deflection: '90.00%' },
  { label: 'Automate...', count: 7, color: 'red', icon: 'check', pos: { left: '76%', top: '24%', width: '6%', height: '12%' }, tickets: 1, interactions: 7, outcome: '28.60%', deflection: '42.90%' },
  { label: 'Coffee Re...', count: 7, color: 'red', icon: 'check', pos: { left: '82%', top: '24%', width: '6%', height: '12%' }, tickets: 0, interactions: 7, outcome: '14.30%', deflection: '28.60%' },
  { label: 'Har...', count: 3, color: 'red', icon: 'check', pos: { left: '88%', top: '24%', width: '6%', height: '12%' }, tickets: 1, interactions: 3, outcome: '33.30%', deflection: '33.30%' },
  { label: 'H...', count: 2, color: 'red', pos: { left: '94%', top: '24%', width: '6%', height: '12%' }, tickets: 0, interactions: 2, outcome: '0.00%', deflection: '50.00%' },
  { label: 'Pol...', count: 5, color: 'red', pos: { left: '76%', top: '36%', width: '6%', height: '10%' }, tickets: 2, interactions: 5, outcome: '20.00%', deflection: '40.00%' },
  { label: 'Zoom Background', count: 20, color: 'red', icon: 'red-sq', pos: { left: '82%', top: '36%', width: '8%', height: '10%' }, tickets: 3, interactions: 20, outcome: '30.00%', deflection: '45.00%' },
  { label: 'Conn...', count: 7, color: 'red', icon: 'check', pos: { left: '90%', top: '36%', width: '5%', height: '10%' }, tickets: 0, interactions: 7, outcome: '42.90%', deflection: '57.10%' },
  { label: 'D...', count: 3, color: 'red', pos: { left: '95%', top: '36%', width: '5%', height: '10%' }, tickets: 1, interactions: 3, outcome: '33.30%', deflection: '33.30%' },
  { label: 'VPN Per...', count: null, color: 'yellow', pos: { left: '0%', top: '46%', width: '8%', height: '14%' }, tickets: 0, interactions: 22, outcome: '54.50%', deflection: '77.30%' },
  { label: 'Ticket Status', count: 55, color: 'yellow', icon: 'check', pos: { left: '8%', top: '46%', width: '10%', height: '14%' }, tickets: 1, interactions: 55, outcome: '60.00%', deflection: '85.50%' },
  { label: 'Password Reset', count: 41, color: 'yellow', icon: 'check', pos: { left: '18%', top: '46%', width: '10%', height: '14%' }, tickets: 0, interactions: 41, outcome: '73.20%', deflection: '92.70%' },
  { label: 'WiFi and Wireless Connectivity', count: 41, color: 'yellow', icon: 'check', pos: { left: '28%', top: '46%', width: '14%', height: '14%' }, tickets: 1, interactions: 41, outcome: '56.10%', deflection: '80.50%' },
  { label: '401k Program In...', count: 21, color: 'yellow', icon: 'check', pos: { left: '42%', top: '46%', width: '8%', height: '14%' }, tickets: 0, interactions: 21, outcome: '66.70%', deflection: '90.50%' },
  { label: 'Ticket Management and Creation Requests', count: 67, color: 'yellow', icon: 'check', pos: { left: '50%', top: '46%', width: '18%', height: '14%' }, tickets: 2, interactions: 67, outcome: '52.20%', deflection: '79.10%' },
  { label: 'Que...', count: 4, color: 'red', pos: { left: '76%', top: '46%', width: '5%', height: '8%' }, tickets: 1, interactions: 4, outcome: '25.00%', deflection: '25.00%' },
  { label: 'Copilo...', count: 6, color: 'red', icon: 'check', pos: { left: '81%', top: '46%', width: '5%', height: '8%' }, tickets: 0, interactions: 6, outcome: '33.30%', deflection: '50.00%' },
  { label: 'Device...', count: 7, color: 'red', icon: 'check', pos: { left: '86%', top: '46%', width: '5%', height: '8%' }, tickets: 1, interactions: 7, outcome: '28.60%', deflection: '42.90%' },
  { label: 'En...', count: 3, color: 'red', pos: { left: '91%', top: '46%', width: '4.5%', height: '8%' }, tickets: 0, interactions: 3, outcome: '33.30%', deflection: '33.30%' },
  { label: 'Keybo...', count: 6, color: 'red', icon: 'check', pos: { left: '95.5%', top: '46%', width: '4.5%', height: '8%' }, tickets: 0, interactions: 6, outcome: '16.70%', deflection: '50.00%' },
  { label: 'Chemical', count: 11, color: 'yellow', icon: 'check', pos: { left: '0%', top: '60%', width: '6%', height: '10%' }, tickets: 0, interactions: 11, outcome: '63.60%', deflection: '81.80%' },
  { label: 'Okta and...', count: 13, color: 'yellow', icon: 'check', pos: { left: '6%', top: '60%', width: '10%', height: '10%' }, tickets: 0, interactions: 13, outcome: '69.20%', deflection: '84.60%' },
  { label: 'Weather and General Information Queries', count: 214, color: 'yellow', icon: 'check', pos: { left: '28%', top: '60%', width: '22%', height: '16%' }, tickets: 0, interactions: 214, outcome: '61.61%', deflection: '87.85%' },
  { label: 'Access and Login Issues A...', count: 83, color: 'yellow', icon: 'check', pos: { left: '50%', top: '60%', width: '18%', height: '16%' }, tickets: 3, interactions: 83, outcome: '50.60%', deflection: '75.90%' },
  { label: 'Empl...', count: 19, color: 'yellow', icon: 'red-sq', pos: { left: '68%', top: '60%', width: '8%', height: '16%' }, tickets: 1, interactions: 19, outcome: '42.10%', deflection: '63.20%' },
  { label: 'O... Ownership of eHe...', count: null, color: 'red', pos: { left: '76%', top: '54%', width: '10%', height: '10%' }, tickets: 2, interactions: 15, outcome: '20.00%', deflection: '33.30%' },
  { label: 'Purcha...', count: null, color: 'red', pos: { left: '86%', top: '54%', width: '14%', height: '10%' }, tickets: 1, interactions: 9, outcome: '22.20%', deflection: '44.40%' },
  { label: 'Adobe Software Acce...', count: 58, color: 'red', icon: 'check', pos: { left: '76%', top: '64%', width: '12%', height: '12%' }, tickets: 2, interactions: 58, outcome: '37.90%', deflection: '55.20%' },
  { label: 'Cisco R...', count: 21, color: 'red', icon: 'check', pos: { left: '88%', top: '64%', width: '12%', height: '12%' }, tickets: 1, interactions: 21, outcome: '38.10%', deflection: '52.40%' },
  { label: 'Ticket Status Inquiry', count: 37, color: 'yellow', icon: 'check', pos: { left: '0%', top: '70%', width: '5%', height: '10%' }, tickets: 0, interactions: 37, outcome: '64.90%', deflection: '89.20%' },
  { label: 'Ticket Status and Updat...', count: 29, color: 'yellow', icon: 'check', pos: { left: '5%', top: '70%', width: '8%', height: '10%' }, tickets: 0, interactions: 29, outcome: '58.60%', deflection: '82.80%' },
  { label: 'Greeting...', count: 29, color: 'yellow', icon: 'check', pos: { left: '13%', top: '70%', width: '7%', height: '10%' }, tickets: 0, interactions: 29, outcome: '79.30%', deflection: '96.60%' },
  { label: 'VPN Connectivi...', count: 103, color: 'yellow', icon: 'check', pos: { left: '20%', top: '70%', width: '10%', height: '10%' }, tickets: 1, interactions: 103, outcome: '55.30%', deflection: '83.50%' },
  { label: 'Requests for New Keybo...', count: 29, color: 'yellow', icon: 'check', pos: { left: '0%', top: '80%', width: '5%', height: '10%' }, tickets: 0, interactions: 29, outcome: '62.10%', deflection: '86.20%' },
  { label: 'Wifi Connecti...', count: 11, color: 'yellow', icon: 'check', pos: { left: '5%', top: '80%', width: '8%', height: '10%' }, tickets: 0, interactions: 11, outcome: '54.50%', deflection: '72.70%' },
  { label: 'Employee 401k Policy Informa...', count: null, color: 'yellow', pos: { left: '28%', top: '76%', width: '12%', height: '14%' }, tickets: 0, interactions: 45, outcome: '71.10%', deflection: '91.10%' },
  { label: 'Paid Ti...', count: null, color: 'yellow', pos: { left: '40%', top: '76%', width: '6%', height: '14%' }, tickets: 0, interactions: 18, outcome: '66.70%', deflection: '88.90%' },
  { label: 'Laptop and Monit...', count: null, color: 'yellow', pos: { left: '46%', top: '76%', width: '10%', height: '14%' }, tickets: 1, interactions: 24, outcome: '54.20%', deflection: '79.20%' },
  { label: 'Pizza Preferences', count: null, color: 'yellow', pos: { left: '56%', top: '76%', width: '8%', height: '14%' }, tickets: 0, interactions: 16, outcome: '75.00%', deflection: '93.80%' },
  { label: 'Laptop Rep...', count: null, color: 'yellow', pos: { left: '64%', top: '76%', width: '8%', height: '14%' }, tickets: 1, interactions: 20, outcome: '50.00%', deflection: '70.00%' },
  { label: 'Language Pre...', count: null, color: 'yellow', pos: { left: '72%', top: '76%', width: '6%', height: '14%' }, tickets: 0, interactions: 14, outcome: '57.10%', deflection: '78.60%' },
  { label: 'Micros...', count: null, color: 'red', pos: { left: '78%', top: '76%', width: '10%', height: '14%' }, tickets: 3, interactions: 25, outcome: '28.00%', deflection: '44.00%' },
  { label: 'Atos Onecontact Fund...', count: null, color: 'red', pos: { left: '88%', top: '76%', width: '12%', height: '14%' }, tickets: 2, interactions: 30, outcome: '23.30%', deflection: '40.00%' },
]

const defaultStats = { tickets: 1, interactions: 214, outcome: '61.61%', deflection: '87.85%', context: 'Cursor' }

const tableRows = [
  { text: '1.0', translated: 'I need to connect to VPN', deflected: true, outcome: 70 },
  ...Array(24).fill(null).map(() => ({ text: '', translated: '', deflected: false, outcome: 30 })),
]

const perPageOptions = [
  { key: 25, value: 25, text: '25' },
  { key: 50, value: 50, text: '50' },
  { key: 100, value: 100, text: '100' },
]

export default function ClusterDashboard() {
  const [view, setView] = useState('table')
  const [stats, setStats] = useState(defaultStats)
  const [selectedCell, setSelectedCell] = useState(null)

  const handleCellClick = (cell, index) => {
    setSelectedCell(index)
    setStats({
      tickets: cell.tickets,
      interactions: cell.interactions,
      outcome: cell.outcome,
      deflection: cell.deflection,
      context: cell.label || 'Selected cluster',
    })
  }

  return (
    <div>
      <Header as="h1">Cluster Dashboard</Header>

      {/* Dataset selector */}
      <div className="dataset-row">
        <div className="dataset-field">
          <label className="ds-label">Dataset</label>
          <Dropdown
            selection
            fluid
            options={[{ key: 1, value: 1, text: 'Krishant Test Dec - 2025-09-01 - 2025-12-04' }]}
            defaultValue={1}
            className="ds-select"
          />
        </div>
        <Button color="black">CREATE DATASET</Button>
        <Button icon="download" basic />
      </div>

      <p className="subtitle">
        Krishant Test Dec - Mon Sep 01 2025 - Thu Dec 04 2025
        <Icon name="info circle" color="grey" style={{ marginLeft: 6 }} />
      </p>

      {/* Stats row */}
      <Statistic.Group widths={4} size="small" className="stats-group">
        <Statistic>
          <Statistic.Value>{stats.tickets}</Statistic.Value>
          <Statistic.Label>Tickets Count</Statistic.Label>
          <div className="stat-context">{stats.context}</div>
        </Statistic>
        <Statistic>
          <Statistic.Value>{stats.interactions}</Statistic.Value>
          <Statistic.Label>Interactions Count</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{stats.outcome}</Statistic.Value>
          <Statistic.Label>Outcome Percentage</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{stats.deflection}</Statistic.Value>
          <Statistic.Label>Deflection Percentage</Statistic.Label>
        </Statistic>
      </Statistic.Group>

      {/* Controls row */}
      <div className="controls-row">
        <Button.Group>
          <Button active={view === 'table'} onClick={() => setView('table')} color={view === 'table' ? 'black' : undefined}>
            <Icon name="table" /> Table
          </Button>
          <Button active={view === 'chart'} onClick={() => setView('chart')} color={view === 'chart' ? 'black' : undefined}>
            <Icon name="chart area" /> Chart
          </Button>
        </Button.Group>

        <Popup
          content="This will resync on knowledge and may take some time"
          trigger={
            <Button basic icon labelPosition="left">
              <Icon name="refresh" />
              REFRESH HEALTH
            </Button>
          }
          position="top center"
          inverted
        />

        <button className="clear-link">Clear</button>
      </div>

      {/* Table view */}
      {view === 'table' && (
        <div className="table-view">
          <div className="pagination-row">
            <div className="pagination-left">
              <strong className="record-count">4158 RECORDS</strong>
              <Dropdown compact selection options={perPageOptions} defaultValue={25} />
              <span className="per-page">per page (1-25)</span>
            </div>
            <div className="page-info">
              Page <Dropdown compact selection options={[{ key: 1, value: 1, text: '1' }]} defaultValue={1} /> of 167
              <Button.Group basic size="mini">
                <Button icon="chevron left" />
                <Button icon="chevron right" />
              </Button.Group>
            </div>
          </div>
          <Table sortable celled striped compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Interaction Text</Table.HeaderCell>
                <Table.HeaderCell>Translated Interaction Text</Table.HeaderCell>
                <Table.HeaderCell>Deflected</Table.HeaderCell>
                <Table.HeaderCell>Outcome</Table.HeaderCell>
                <Table.HeaderCell>Automation Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tableRows.map((row, i) => (
                <Table.Row key={i}>
                  <Table.Cell>{row.text}</Table.Cell>
                  <Table.Cell>{row.translated}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {row.deflected && <Icon name="checkmark" color="yellow" />}
                  </Table.Cell>
                  <Table.Cell>{row.outcome}</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}

      {/* Chart view */}
      {view === 'chart' && (
        <div className="treemap-area">
          <div className="treemap">
            {treemapCells.map((cell, i) => (
              <div
                key={i}
                className={`tm-cell bg-${cell.color} ${selectedCell === i ? 'selected' : ''}`}
                style={cell.pos}
                onClick={() => handleCellClick(cell, i)}
              >
                <span className="tm-label">{cell.label}</span>
                <span className="tm-count">
                  {cell.count ?? ''}
                  {cell.icon === 'check' && ' \u2611'}
                  {cell.icon === 'red-sq' && <span style={{ color: 'red' }}> &#9632;</span>}
                </span>
              </div>
            ))}
          </div>

          <div className="legend">
            <div className="legend-item">
              <span className="legend-swatch" style={{ background: '#e06060' }} />
              Subpar, interactions have too many tickets, poor feedback, or missing content
            </div>
            <div className="legend-item">
              <span className="legend-swatch" style={{ background: '#e8b829' }} />
              Average, lacking feedback, neutral sentiment, potentially some tickets
            </div>
            <div className="legend-item">
              <span className="legend-swatch" style={{ background: '#6dbf6d' }} />
              Good, evidence of good sentiment, feedback and quality answers
            </div>
            <div className="legend-icon">
              <span>&#9745;</span> Existing KBs can potentially provide enough answers
            </div>
            <div className="legend-icon">
              <span style={{ color: 'red' }}>&#9632;</span> Existing KBs cannot provide enough answers
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
