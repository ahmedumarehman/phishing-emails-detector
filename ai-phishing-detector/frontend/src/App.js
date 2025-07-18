import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    CircularProgress,
    Chip,
    Divider,
    Grid,
    Card,
    CardContent,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Tooltip,
    Switch,
    FormControlLabel,
    Collapse,
    Tabs,
    Tab
} from '@mui/material';
import {
    Security,
    Warning,
    CheckCircle,
    Link,
    BugReport,
    Analytics,
    Refresh,
    ExpandMore,
    ExpandLess,
    GitHub,
    LightMode,
    DarkMode,
    Email,
    Public
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { emailAPI } from './mockAPI';
import URLChecker from './components/URLChecker';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function App() {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [apiHealth, setApiHealth] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#dc004e',
            },
            background: {
                default: darkMode ? '#121212' : '#f5f5f5',
                paper: darkMode ? '#1e1e1e' : '#ffffff',
            },
        },
        typography: {
            fontFamily: 'Inter, sans-serif',
            h4: {
                fontWeight: 600,
            },
            h6: {
                fontWeight: 500,
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        borderRadius: 8,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                    },
                },
            },
        },
    });

    useEffect(() => {
        checkApiHealth();
    }, []);

    const checkApiHealth = async () => {
        try {
            const health = await emailAPI.healthCheck();
            setApiHealth(health);
        } catch (error) {
            setApiHealth({ status: 'error', model_loaded: false, message: 'API unavailable' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await emailAPI.predictPhishing({
                subject: subject.trim(),
                body: body.trim(),
            });
            setResult(response);
        } catch (error) {
            setError(error.response?.data?.detail || 'Failed to analyze email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setSubject('');
        setBody('');
        setResult(null);
        setError(null);
    };

    const getPredictionColor = (prediction) => {
        if (prediction === 'Phishing Email') return 'error';
        if (prediction === 'Safe Email') return 'success';
        return 'warning';
    };

    const getPredictionIcon = (prediction) => {
        if (prediction === 'Phishing Email') return <Warning />;
        if (prediction === 'Safe Email') return <CheckCircle />;
        return <BugReport />;
    };

    const getConfidenceColor = (confidence) => {
        if (confidence >= 80) return 'success';
        if (confidence >= 60) return 'warning';
        return 'error';
    };

    const sampleEmails = [
        {
            type: 'Phishing',
            subject: 'URGENT: Your account will be suspended',
            body: 'Click here to verify your account: http://suspicious-link.com/verify'
        },
        {
            type: 'Safe',
            subject: 'Weekly Newsletter',
            body: 'Thank you for subscribing to our newsletter. Here are this week\'s updates...'
        }
    ];

    const loadSampleEmail = (sample) => {
        setSubject(sample.subject);
        setBody(sample.body);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" elevation={0}>
                <Toolbar>
                    <Security sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        🛡️ AI-Powered Phishing Email Detector
                    </Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={darkMode}
                                onChange={(e) => setDarkMode(e.target.checked)}
                                icon={<LightMode />}
                                checkedIcon={<DarkMode />}
                            />
                        }
                        label=""
                    />
                    <Tooltip title="GitHub Repository">
                        <IconButton color="inherit" href="https://github.com" target="_blank">
                            <GitHub />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* API Health Status */}
                <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" alignItems="center">
                                <Analytics sx={{ mr: 1 }} />
                                <Typography variant="h6">API Status</Typography>
                                <IconButton size="small" onClick={checkApiHealth} sx={{ ml: 1 }}>
                                    <Refresh />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {apiHealth && (
                                <Box>
                                    <Chip
                                        icon={apiHealth.status === 'healthy' ? <CheckCircle /> : <Warning />}
                                        label={`${apiHealth.status} - Model ${apiHealth.models_loaded ? 'Loaded' : 'Not Loaded'}`}
                                        color={apiHealth.status === 'healthy' && apiHealth.models_loaded ? 'success' : 'warning'}
                                        variant="outlined"
                                    />
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Paper>

                <Grid container spacing={3}>
                    {/* Main Content with Tabs */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={2} sx={{ p: 0 }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={tabValue} onChange={handleTabChange} aria-label="analysis tabs">
                                    <Tab
                                        label="Email Analysis"
                                        icon={<Email />}
                                        iconPosition="start"
                                        sx={{ minHeight: 72 }}
                                    />
                                    <Tab
                                        label="URL Checker"
                                        icon={<Public />}
                                        iconPosition="start"
                                        sx={{ minHeight: 72 }}
                                    />
                                </Tabs>
                            </Box>

                            <TabPanel value={tabValue} index={0}>
                                <Typography variant="h5" gutterBottom>
                                    Email Analysis
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    Enter the email subject and body to analyze for phishing indicators
                                </Typography>

                                <form onSubmit={handleSubmit}>
                                    <Box sx={{ mb: 3 }}>
                                        <TextField
                                            fullWidth
                                            label="Email Subject"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            variant="outlined"
                                            required
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Email Body"
                                            value={body}
                                            onChange={(e) => setBody(e.target.value)}
                                            variant="outlined"
                                            multiline
                                            rows={8}
                                            required
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={loading || !subject.trim() || !body.trim()}
                                            startIcon={loading ? <CircularProgress size={20} /> : <Security />}
                                            size="large"
                                        >
                                            {loading ? 'Analyzing...' : 'Analyze Email'}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={handleClear}
                                            disabled={loading}
                                            size="large"
                                        >
                                            Clear
                                        </Button>
                                    </Box>
                                </form>

                                {error && (
                                    <Alert severity="error" sx={{ mb: 2 }}>
                                        {error}
                                    </Alert>
                                )}

                                {result && (
                                    <Card elevation={3} sx={{ mt: 3 }}>
                                        <CardContent>
                                            <Box sx={{ mb: 2 }}>
                                                <Chip
                                                    icon={getPredictionIcon(result.prediction)}
                                                    label={result.prediction}
                                                    color={getPredictionColor(result.prediction)}
                                                    size="large"
                                                    sx={{ mb: 2 }}
                                                />
                                                <Typography variant="h6" sx={{ mb: 1 }}>
                                                    Confidence: {result.confidence}%
                                                </Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={result.confidence}
                                                    color={getConfidenceColor(result.confidence)}
                                                    sx={{ mb: 2 }}
                                                />
                                                <Typography variant="body2" color="text.secondary">
                                                    Analysis Method: {result.reason}
                                                </Typography>
                                                {result.analysis_type && (
                                                    <Chip
                                                        label={`Model: ${result.analysis_type}`}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ mt: 1 }}
                                                    />
                                                )}
                                            </Box>

                                            <Button
                                                onClick={() => setShowDetails(!showDetails)}
                                                endIcon={showDetails ? <ExpandLess /> : <ExpandMore />}
                                                sx={{ mb: 2 }}
                                            >
                                                {showDetails ? 'Hide' : 'Show'} Details
                                            </Button>

                                            <Collapse in={showDetails}>
                                                <Divider sx={{ my: 2 }} />

                                                {/* URL Predictions from Enhanced Model */}
                                                {result.url_predictions && result.url_predictions.length > 0 && (
                                                    <Box sx={{ mb: 2 }}>
                                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                                            URL Analysis Results
                                                        </Typography>
                                                        <List dense>
                                                            {result.url_predictions.map((urlPred, index) => (
                                                                <ListItem key={index}>
                                                                    <ListItemIcon>
                                                                        <Link color={urlPred.prediction === 'Phishing' ? 'error' : 'success'} />
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={urlPred.url}
                                                                        secondary={`${urlPred.prediction} - ${urlPred.confidence.toFixed(1)}% confidence`}
                                                                    />
                                                                    <Chip
                                                                        size="small"
                                                                        label={urlPred.prediction}
                                                                        color={urlPred.prediction === 'Phishing' ? 'error' : 'success'}
                                                                    />
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    </Box>
                                                )}

                                                {/* Links Analysis */}
                                                <Typography variant="h6" sx={{ mb: 1 }}>
                                                    Links Analysis
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                    Total Links Found: {result.total_links}
                                                </Typography>

                                                {result.malicious_links && result.malicious_links.length > 0 && (
                                                    <Box sx={{ mb: 2 }}>
                                                        <Alert severity="error" sx={{ mb: 1 }}>
                                                            Malicious Links Detected by VirusTotal!
                                                        </Alert>
                                                        <List dense>
                                                            {result.malicious_links.map((link, index) => (
                                                                <ListItem key={index}>
                                                                    <ListItemIcon>
                                                                        <Link color="error" />
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={link}
                                                                        secondary="Flagged as malicious by VirusTotal"
                                                                    />
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    </Box>
                                                )}

                                                {/* Suspicious Patterns */}
                                                {result.suspicious_patterns && result.suspicious_patterns.length > 0 && (
                                                    <Box sx={{ mb: 2 }}>
                                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                                            Suspicious Patterns Found
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                            {result.suspicious_patterns.map((pattern, index) => (
                                                                <Chip
                                                                    key={index}
                                                                    label={pattern}
                                                                    size="small"
                                                                    color="warning"
                                                                    variant="outlined"
                                                                />
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                )}
                                            </Collapse>
                                        </CardContent>
                                    </Card>
                                )}
                            </TabPanel>

                            <TabPanel value={tabValue} index={1}>
                                <URLChecker />
                            </TabPanel>
                        </Paper>
                    </Grid>

                    {/* Sample Emails */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={2} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Sample Emails
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Try these sample emails to test the detector
                            </Typography>

                            {sampleEmails.map((sample, index) => (
                                <Card
                                    key={index}
                                    variant="outlined"
                                    sx={{ mb: 2, cursor: 'pointer' }}
                                    onClick={() => loadSampleEmail(sample)}
                                >
                                    <CardContent sx={{ p: 2 }}>
                                        <Chip
                                            label={sample.type}
                                            color={sample.type === 'Phishing' ? 'error' : 'success'}
                                            size="small"
                                            sx={{ mb: 1 }}
                                        />
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            {sample.subject}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {sample.body.substring(0, 100)}...
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="h6" gutterBottom>
                                Features
                            </Typography>
                            <List dense>
                                <ListItem>
                                    <ListItemIcon>
                                        <Security />
                                    </ListItemIcon>
                                    <ListItemText primary="AI-powered detection" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Link />
                                    </ListItemIcon>
                                    <ListItemText primary="VirusTotal integration" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Analytics />
                                    </ListItemIcon>
                                    <ListItemText primary="Real-time analysis" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <BugReport />
                                    </ListItemIcon>
                                    <ListItemText primary="Pattern recognition" />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App;
